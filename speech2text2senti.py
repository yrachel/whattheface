from textblob import TextBlob

import speech_recognition as sr

#recognizer object
r=sr.Recognizer()

#captures audio
with sr.Microphone() as source:
    print('Please wait-- currently listening for ambient noise levels...')
    r.adjust_for_ambient_noise(source)
    print('Complete. Begin speaking now.')
    audio=r.listen(source)
    print('Audio has been captured.')

    recognized_audio=r.recognize_google(audio)

try:
    print('You said "'+recognized_audio+'"')
except sr.UnknownValueError:
    print('could not understand audio.')
except sr.RequestError as e:
    print('Could not request results; {0}'.format(e))

#NLP analysis of audio as string
TB_object=TextBlob(recognized_audio) #makes textblob object
print(TB_object.sentiment) #sentiment analysis
