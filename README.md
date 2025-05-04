
# TheraSpark Therapeutic Development Assistant

TheraSpark is an AI-powered therapeutic development assistant that helps identify potential drug targets and molecules for disease treatment.

## Setup Instructions

### Backend Setup

1. Change to the backend directory:
   ```
   cd backend
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```
   
   Alternatively, you can run:
   ```
   python -m backend.app
   ```

### Frontend Setup

1. Install the frontend dependencies:
   ```
   npm install
   ```

2. Start the frontend development server:
   ```
   npm run dev
   ```

3. Access the application at: http://localhost:8080

## Configuration

- The application can use either Vertex AI (TxGemma) or Kimi (Moonshot AI) for generating responses.
- To switch between the two, update the `USE_KIMI_TESTING` variable in the `backend/.env` file:
  - Set to `"true"` to use Kimi/Moonshot AI
  - Set to `"false"` to use Vertex AI/TxGemma
- Remember to restart the backend server after changing the configuration.
