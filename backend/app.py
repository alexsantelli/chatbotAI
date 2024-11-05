from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Configure OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=user_message,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
