from flask import Flask, render_template, request
import google.generativeai as genai
from flask import Flask, render_template, request
from flask_cors import CORS  # Import CORS from flask_cors module
# Enable CORS for all routes

# Your other routes and code here...

app = Flask(__name__)
CORS(app) 

GOOGLE_API_KEY = 'AIzaSyBaj3yH1P6dNttlssEt_aAptFpLed4PoKw'  
genai.configure(api_key=GOOGLE_API_KEY)


model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def home():
    return "Hello world!"
@app.route('/generate', methods=['POST'])
def generate():
    if request.method == 'POST':
        data = request.json
        selected_answers = data.get('selectedAnswers') # ex:- diabetes, hypertension, etc
    
        text_input = "give me 7 day diet plan of a " + str(selected_answers) + " in text consisting of names in breakfast, lunch and dinner only without any extra description  "
        # if s == "":
        #     return render_template('index.html', generated_text="Please enter a valid input")
        response = model.generate_content(text_input)
        generated_text = response.text
        return generated_text
@app.route('/training', methods=['POST'])
def training():
    if request.method == 'POST':
        data = request.json
        selected_answers = data.get('selectedAnswers') # ex:- diabetes, hypertension, etc
    
        text_input = "give me 7 day exercise plan of a " + str(selected_answers) + " in text consisting of names of exercises and numer of reps only without any extra description  "
        # if s == "":
        #     return render_template('index.html', generated_text="Please enter a valid input")
        response = model.generate_content(text_input)
        generated_text = response.text
        return generated_text

if __name__ == '__main__':
    app.run(debug=True)