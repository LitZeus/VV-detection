# Varicose Veins Detection using YOLO

This project is designed to assist in the early detection of varicose veins using a deep learning model (YOLO). It allows users to upload or capture images and processes them using a trained YOLO model to identify varicose veins, providing a valuable diagnostic tool for healthcare professionals.

## Frontend

The frontend of this project is built using React, and it enables users to upload an image or capture an image using a webcam for varicose vein detection.

### Requirements

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/VV-detection.git
   ```

2.  Navigate to the `frontend` directory:
    
    ```bash
    cd varicose-veins-detection/frontend
    ```
    
3.  Install the required dependencies:
    
    ```bash
    npm install
    ```
    

### Running the Frontend

To run the React application in development mode, use the following command:

   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000` in your browser.

The page will reload automatically when changes are made, and any lint errors will be displayed in the console.

### Testing

To run tests for the frontend:

   ```bash
   npm test
   ```

### Build for Production

To build the app for production:

```bash
npm run build
```

The production build will be placed in the `build` folder, optimized for performance.

* * *

Backend
-------

The backend of this project is designed to process the uploaded or captured images using a YOLO-based deep learning model. It provides an API for image uploads and processing, returning results for varicose vein detection.

### Requirements

*   Python 3.x
*   Flask
*   TensorFlow (or PyTorch, depending on model framework)
*   Other dependencies (see `requirements.txt`)

### Installation

1.  Clone the repository:
    
    ```bash
    git clone https://github.com/your-username/varicose-veins-detection.git
      ```

2.  Navigate to the `backend` directory:
    
    ```bash
    cd varicose-veins-detection/backend
      ```
    
3.  Install the required dependencies:
    
    ```bash
    pip install -r requirements.txt
     ```

### Running the Backend

To start the backend server:

   ```bash
   python app.py
   ```

By default, the backend will run on `http://localhost:5000`.

### Testing

To run tests for the backend:

```bash
pytest
  ```

* * *

License
---

This project is licensed under the **Proprietary License**. It is intended for approved users only and cannot be redistributed or used without permission.

For any inquiries, access requests, or issues related to the project, please contact the project administrator via GitHub Issues or directly at:

- Email: [<me.tejasathalye@gmail.com>](mailto:me.tejasathalye@gmail.com)

All rights reserved.

* * *
