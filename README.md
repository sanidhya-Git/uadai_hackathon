# Aadhaar InsightX - AI-Driven Intelligence Platform

A comprehensive Next.js dashboard for analyzing Aadhaar enrolment and update patterns across India with advanced visualizations, anomaly detection, and predictive analytics.

## 🚀 Features

- **📊 Overview Dashboard**: Real-time KPIs, trends, and age distribution analysis
- **🗺️ Interactive Maps**: State and district-level heatmaps with drill-down capabilities
- **⚠️ Anomaly Detection**: Identify unusual patterns with severity-based alerts
- **📈 Predictive Analytics**: Multiple forecasting models (ARIMA, Prophet, Linear, Exponential)
- **🎨 Modern UI**: Clean, responsive design with smooth animations
- **📱 Mobile Responsive**: Works seamlessly on all devices

## 📁 Project Structure

```
aadhaar-insightx/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Homepage with overview
│   ├── globals.css                # Global styles with Tailwind
│   ├── state/
│   │   └── page.tsx              # State & district analysis
│   ├── anomaly/
│   │   └── page.tsx              # Anomaly detection dashboard
│   └── forecast/
│       └── page.tsx              # Predictive analytics
├── components/
│   ├── Navbar.tsx                # Navigation bar
│   ├── KPICard.tsx               # KPI display cards
│   ├── IndiaHeatMap.tsx          # India state map
│   ├── DistrictHeatMap.tsx       # District-level map
│   ├── DistrictChart.tsx         # District bar chart
│   ├── LineChart.tsx             # Trend line chart
│   ├── Heatmap.tsx               # Bar chart heatmap
│   ├── MapLegend.tsx             # Map color legend
│   ├── DataTable.tsx             # Reusable data table
│   └── ExportPDFButton.tsx       # PDF export functionality
├── services/
│   └── api.ts                    # API service layer
└── public/
    └── maps/
        ├── india-states.json     # State boundaries GeoJSON
        └── india-districts.json  # District boundaries GeoJSON
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Next.js 13+ (App Router)
- Backend API running

### Steps

1. **Install Dependencies**
```bash
npm install
# or
yarn install
```

Required packages:
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0",
    "react-simple-maps": "^3.0.0",
    "d3-scale": "^4.0.2",
    "axios": "^1.6.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.1",
    "html2canvas": "^1.4.1",
    "jspdf": "^2.5.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

2. **Configure Tailwind CSS**

Create `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

3. **Add GeoJSON Map Files**

Download India map data:
- Place `india-states.json` in `public/maps/`
- Place `india-districts.json` in `public/maps/`

You can get these from:
- https://github.com/geohacker/india
- https://datahub.io/core/geo-countries

4. **Configure API Endpoint**

Update `services/api.ts` baseURL to match your backend:
```typescript
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api/backend",
  // ...
});
```

5. **Environment Variables**

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🎯 Backend API Requirements

Your backend should provide these endpoints:

### 1. Overview Data
```
GET /api/backend?path=overview
Response: {
  total_states: number,
  total_enrolments: number,
  total_updates: number,
  volatility_score: number
}
```

### 2. State Insights
```
GET /api/backend?path=state/insights
Response: [{
  state: string,
  total_enrolments: number,
  total_updates: number
}]
```

### 3. District Insights
```
GET /api/backend?path=district/{state}
Response: [{
  district: string,
  age_0_5: number,
  age_5_17: number,
  age_18_greater: number
}]
```

### 4. Anomalies
```
GET /api/backend?path=anomaly/alerts
Response: [{
  state: string,
  total_enrolments: number
}]
```

### 5. Forecast
```
GET /api/backend?path=forecast/compare
Response: {
  arima_prediction: number,
  prophet_prediction: number
}
```

## 🚀 Running the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors
Modify colors in `tailwind.config.js` or component files.

### Charts
All charts use Recharts. Customize in component files:
- `components/LineChart.tsx`
- `components/Heatmap.tsx`
- `components/DistrictChart.tsx`

### Maps
Update map projections and scales in:
- `components/IndiaHeatMap.tsx`
- `components/DistrictHeatMap.tsx`

## 📊 Features Breakdown

### Overview Page (`app/page.tsx`)
- 4 KPI cards with trend indicators
- Line chart for state-wise trends
- Pie chart for age distribution
- Interactive India heatmap
- State-wise bar chart

### State Analysis (`app/state/page.tsx`)
- Searchable state selector
- Interactive India map with click-to-drill-down
- Age group filtering (0-5, 5-17, 18+)
- District heatmap with zoom capabilities
- District statistics cards

### Anomaly Detection (`app/anomaly/page.tsx`)
- Severity-based filtering (High/Medium/Low)
- Summary cards for each severity level
- Bar chart visualization
- Anomaly score trends
- Detailed alert cards
- Comprehensive data table

### Forecasting (`app/forecast/page.tsx`)
- Multiple prediction models comparison
- Historical vs predicted trends
- Model performance metrics
- Confidence levels
- Interactive model selector

## 🔧 Troubleshooting

### Maps not rendering
- Ensure GeoJSON files are in `public/maps/`
- Check console for 404 errors
- Verify file paths in map components

### API errors
- Check backend is running
- Verify API endpoint URLs
- Check CORS settings
- Review network tab in DevTools

### Styling issues
- Ensure Tailwind is properly configured
- Check `globals.css` is imported
- Verify PostCSS configuration

## 📝 Best Practices

1. **Error Handling**: All API calls have try-catch blocks
2. **Loading States**: Show spinners during data fetching
3. **Responsive Design**: Mobile-first approach
4. **Performance**: Use React memoization where needed
5. **Type Safety**: TypeScript interfaces for all data

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions:
- Create an issue on GitHub
- Contact: support@aadhaarinsightx.com

---

**Built with ❤️ using Next.js, React, Tailwind CSS, and Recharts**