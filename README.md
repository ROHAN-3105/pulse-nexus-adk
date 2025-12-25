# Pulse Nexus ADK

**Pulse Nexus ADK** is an advanced healthcare analytics platform powered by AI-driven agents. It provides real-time wearable data analysis, clinical guidance, and biosecurity monitoring through a modular multi-agent architecture.

## 🎯 Project Overview

Pulse Nexus combines wearable device data with artificial intelligence to deliver:
- **Clinical Insights** - AI-powered medical diagnosis and treatment recommendations
- **Biosecurity Monitoring** - Real-time biosecurity alerts and anomaly detection
- **Data Analysis** - Comprehensive wearable data analytics and health insights
- **Modern Frontend** - React-based dashboard for data visualization and agent interaction

## 🏗️ Architecture

The project follows a **multi-agent architecture** with:

### Backend Agents
1. **Clinical Core Agent** (`clinical_core_agent/`)
   - Medical diagnosis and treatment recommendations
   - Guideline-based RAG (Retrieval-Augmented Generation)
   - Processes patient queries and health data

2. **Bio Sentry Agent** (`bio_sentry_agent/`)
   - Biosecurity monitoring and threat detection
   - Real-time alert generation
   - Anomaly detection from wearable sensors

3. **Data Analyst Agent** (`data_analyst_agent/`)
   - Wearable data analysis and processing
   - Health metrics insights
   - Trend analysis and reporting

### Frontend
- **React + Vite** modern SPA
- **Tailwind CSS** for responsive design
- **Real-time dashboard** for data visualization

### Backend API
- **FastAPI** server with CORS enabled
- RESTful endpoints for agent communication
- Health check and status monitoring

## 📁 Project Structure

```
pulse-nexus-adk/
├── bio_sentry_agent/          # Biosecurity monitoring agent
│   ├── __init__.py
│   ├── agent.py               # Agent implementation
│   └── tools/                 # Tool utilities
├── clinical_core_agent/        # Clinical diagnosis agent
│   ├── __init__.py
│   ├── agent.py
│   └── tools/
├── data_analyst_agent/         # Data analysis agent
│   ├── __init__.py
│   ├── agent.py
│   └── tools/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── PulseNexusDashboard.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
├── pulse_nexus/               # Core utilities and configurations
├── videos/                    # Demo and documentation videos
├── server.py                  # FastAPI backend server
├── requirements.txt           # Python dependencies
├── wearable_samples.csv       # Sample wearable data
├── .env                       # Environment configuration
└── .gitignore

```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Create or edit .env file with your configuration
   # Example:
   GOOGLE_API_KEY=your_key_here
   ```

4. **Run the backend server:**
   ```bash
   python server.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Health & Status
- **GET** `/` - API status and version info
- **GET** `/health` - Health check with agent status

### Agent Endpoints
All agent endpoints accept POST requests with a `MessageRequest` body and return a `MessageResponse`.

#### Request Body Format
```json
{
  "message": "Your query here",
  "context": {}
}
```

#### Response Format
```json
{
  "response": "Agent response text",
  "agent": "agent_name",
  "status": "success"
}
```

#### Available Agents
- **POST** `/api/clinical` - Clinical Core Agent
  - Medical diagnosis and treatment recommendations
  
- **POST** `/api/bioSentry` - Bio Sentry Agent
  - Biosecurity monitoring and alerts
  
- **POST** `/api/dataAnalyst` - Data Analyst Agent
  - Wearable data analysis and insights

## 📊 Features

### Clinical Core Agent
- AI-powered medical diagnosis
- Guideline-based recommendations
- Treatment options analysis
- Patient query processing

### Bio Sentry Agent
- Real-time biosecurity monitoring
- Threat detection and alerts
- Anomaly detection from wearable data
- Security event logging

### Data Analyst Agent
- Wearable device data processing
- Health metrics calculation
- Trend analysis
- Data visualization preparation

### Frontend Dashboard
- Real-time data visualization
- Agent interaction interface
- Health metrics display
- Alert notifications
- Responsive design

## 🛠️ Dependencies

### Python Packages
- `fastapi` - Backend web framework
- `uvicorn` - ASGI server
- `google-adk` - Google integration
- `google-generativeai` - Generative AI capabilities
- `litellm` - Language model abstraction
- `python-dotenv` - Environment management
- `yfinance` - Financial data
- `psutil` - System utilities
- `PyPDF2` - PDF processing

### Frontend Packages
- `react` - UI library
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `postcss` - CSS processing

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
# API Keys
GOOGLE_API_KEY=your_google_api_key
GENERATIVE_AI_KEY=your_generativeai_key

# Server Configuration
SERVER_HOST=0.0.0.0
SERVER_PORT=8000

# Frontend Configuration
VITE_API_URL=http://localhost:8000
```

## 📝 Usage Examples

### Querying Clinical Agent
```bash
curl -X POST "http://localhost:8000/api/clinical" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the symptoms of hypertension?",
    "context": {}
  }'
```

### Querying Data Analyst Agent
```bash
curl -X POST "http://localhost:8000/api/dataAnalyst" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Analyze my wearable data for today",
    "context": {}
  }'
```

## 🧪 Testing

Run health check to verify all agents are active:
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "agents": {
    "clinical": "active",
    "bioSentry": "active",
    "dataAnalyst": "active"
  }
}
```

## 📚 Documentation

### API Documentation
Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔐 Security Considerations

- CORS is currently configured to allow all origins (`*`). For production, replace with your frontend URL
- Ensure API keys are stored securely in environment variables
- Never commit `.env` files to version control
- Validate all input data from clients

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **ROHAN-3105** - Project creator

## 🆘 Support

For issues, questions, or suggestions:
1. Check existing [GitHub Issues](https://github.com/ROHAN-3105/pulse-nexus-adk/issues)
2. Create a new issue with detailed description
3. Include relevant logs and error messages

## 🗺️ Roadmap

- [ ] Integrate real wearable device APIs
- [ ] Enhanced clinical RAG system
- [ ] Mobile app development
- [ ] Real-time alert notifications
- [ ] Database integration for data persistence
- [ ] Advanced analytics dashboard
- [ ] Machine learning model improvements
- [ ] Deployment documentation

## 🎓 Technology Stack

### Backend
- Python 3.8+
- FastAPI
- Uvicorn
- Google Generative AI
- LiteLLM

### Frontend
- React 18+
- Vite
- Tailwind CSS
- PostCSS

### Data
- CSV processing
- Real-time analytics
- Wearable data integration

---

**Last Updated:** December 2025

For more information, visit the [GitHub Repository](https://github.com/ROHAN-3105/pulse-nexus-adk)
