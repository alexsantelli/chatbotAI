from flask import Flask, request, jsonify
from openai import OpenAI
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
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        print(f"Received user message: {user_message}")  # Log user message

        # Use the custom assistant
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",  # Ensure the model matches the assistant's configuration
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150
        )

        answer = response.choices[0].message.content.strip()
        return jsonify({'answer': answer})

    except Exception as e:
        print(f"Error during OpenAI API call: {e}")  # Log error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
