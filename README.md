# Finance Tracker 💰

A modern, responsive personal finance tracker built with React and Firebase. Track your expenses, visualize your spending patterns, and manage your budget effectively.

## 🌟 Features

- **User Authentication**: Secure login and registration with Firebase Auth
- **Expense Management**: Add, edit, and delete expenses with ease
- **Category Tracking**: Organize expenses by categories (Food, Transport, Entertainment, etc.)
- **Interactive Dashboard**: Visual charts and analytics powered by Recharts
- **Real-time Data**: Cloud-based storage with Firebase Firestore
- **Responsive Design**: Beautiful gradient UI that works on all devices
- **Budget Insights**: Track spending patterns and financial trends

## 🚀 Live Demo

Visit the live application: [https://financetracker-eed50.web.app](https://financetracker-eed50.web.app)

## 🛠️ Technologies Used

- **Frontend**: React.js, React Router
- **Backend**: Firebase (Authentication, Firestore Database, Hosting)
- **Charts**: Recharts library for data visualization
- **Styling**: Custom CSS with modern gradient designs
- **Icons**: React Icons for beautiful UI elements

## 📱 Screenshots

### Dashboard
- Interactive pie charts showing expense distribution
- Monthly spending summaries
- Quick expense overview

### Expense Management
- Add new expenses with category selection
- Edit existing expenses
- Delete unwanted entries
- Filter and search functionality

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Purity-Inn/finance-tracker.git
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase.js`

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm run deploy`
Deploys the app to Firebase Hosting

## 📊 Project Structure

```
src/
├── components/
│   └── ExpenseList.js          # Expense list component
├── pages/
│   ├── Dashboard.jsx           # Main dashboard with charts
│   ├── AddExpense.jsx          # Add new expense form
│   ├── AllExpenses.jsx         # View all expenses
│   ├── EditExpense.jsx         # Edit expense form
│   ├── Login.jsx               # User login page
│   └── Register.jsx            # User registration page
├── App.js                      # Main app component with routing
├── App.css                     # Global styles and themes
├── firebase.js                 # Firebase configuration
└── index.js                    # Application entry point
```

## 🔐 Firebase Security

The app includes proper Firestore security rules to ensure users can only access their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Purity Inn**
- GitHub: [@Purity-Inn](https://github.com/Purity-Inn)

## 🙏 Acknowledgments

- Create React App for the initial project setup
- Firebase for backend services
- Recharts for beautiful data visualization
- React Router for navigation
- The React community for amazing resources

---

⭐ Star this repo if you found it helpful!
