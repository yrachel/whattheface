from google.cloud import vision
from google.cloud.vision import types
from flask import Flask, request, Response
import os
import operator
import json
import base64
import request
app = Flask(__name__)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './credentials.json'


def detect_face(face_file, max_results=4):
    """Uses the Vision API to detect faces in the given file.

    Args:
        face_file: A file-like object containing an image with faces.

    Returns:
        An array of Face objects with information about the picture.
    """
    client = vision.ImageAnnotatorClient()

    content = face_file.read()
    image = types.Image(content=content)

    return client.face_detection(image=image).face_annotations

"""Requests picture from the frontend and sends a JSON, parsed down to the strongest emotions.
   Args:
	NONE.
   Returns:
	A JSON response.
"""
@app.route("/image", methods = ['POST'])
def saveImage():
	data = request.main.pictureData
	#data = json.loads(request.data).image_encoded
	with open("imageToSave.png", "wb") as fh:
    		fh.write(data.decode('base64', 'strict'))
	emotionArray = main("imageToSave.png", 4)
        return Response(json.dumps({'face1': emotionArray[0]}), mimetype=u'application/json')

"""Returns an array with the strongest emotion of each face.
   Args:
	dict of dicts
   Returns:
	array of most intense emotions
"""
def maxEmotions(dicts):
	output = []
	for face in dicts:
		output.append(str(max(dicts[face].iteritems(), key=operator.itemgetter(1))[0]))
	return output

"""Returns a dictionary of faces, which are each dictionaries of emotions: intensity
    Args:
	input file and max number of faces
    Returns:
	dict of dicts
"""
def process(input, max_results):
    with open(input, 'rb') as image:
        faces = detect_face(image, max_results)

	i = 1
	dictOfDicts = {}
	for face in faces:
	   emotions = {"joy": face.joy_likelihood, "sorrow": face.sorrow_likelihood, "anger": face.anger_likelihood, "surprise": face.surprise_likelihood}
	   dictOfDicts['face'+str(i)] = emotions
	   i+=1
	return dictOfDicts

"""Calls maxEmotions() on process(), to return the strongest emotions of each face.
   Args:
	input file and max number of faces
   Returns:
	list of strongest emotions
"""
def main(input, max_results):
   return maxEmotions(process(input, max_results))

print main('happy rock.jpg', 4)

app.run(host='192.168.1.38')
