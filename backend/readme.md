<div align=center>
<img src="https://www.intel.com/content/dam/develop/public/us/en/images/logos/logo-oneapi-rwd.png" width=200>
<img src="https://github.com/t-aswath/mdeditor/assets/119417646/3f2def29-79c2-42e9-9e6b-f7167d1b99ff" width=100>
<h1>DAKSH INTEL ONE API HACKATHON 2024</h1> 
<img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&color=black">
<img src="https://img.shields.io/badge/:bitspace-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/intel-%23121011?style=for-the-badge&color=blue">
<img src="https://img.shields.io/badge/daksh-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&color=black">
</div>
<br>

# Backend
<i><b>Tech stack:</b></i>
    
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Gunicorn](https://img.shields.io/badge/gunicorn-%298729.svg?style=for-the-badge&logo=gunicorn&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

The backend part of the application comprises of two separate parts to classify the backend in a modular manner, which are,

<b><i>An Express.js server:</i></b>
    <br />
    The Express.js server is the main API of the application which handles the communication between the <i>client</i> (mobile application) and the <i>database</i>. It is primarily used in order to get the real-time data of the patients correlated to each and every doctor in a hospital, which is later used to analyze the trend for the purpose of predictive analysis.
    The server enables the following functionalities/actions.
    <br />
    <br />
    <b>Actions:</b>
    <br />
    <ul>
        <li>Make appointments for the patients with a doctor.</li>
        <li>Mark a patient as consulted.</li>
        <li>Recalculate the average waiting time of a patient after each consultancy.</li>
        <li>Get a list of available doctors within a given perimeter radius.</li>
        <li>Calculate the time to travel to reach each hospital from the users location.</li>
    </ul>
<b><i>A Flask server:</i></b>
    <br />
    The Flask server exists as a proxy server, and handles any sort of communications with the <i>Machine Learning</i> models that are used by the application.
    <br />
    <br />
    The two models which are used for the purpose of,
    <ul>
        <li>Estimating the number of patients waiting in the queue.</li>
        <li>Suggesting if it is actually viable to make efforts to travel for the purpose of consulting with a doctor.</li>
    </ul>
    are loaded with the flask server, to which the necessary params are provided by the express server, whose corresponding output is again sent via the express server, back to the <i>client</i> (mobile application).

<b><i>Architecture:</b></i>
    ![image](https://github.com/t-aswath/mdeditor/assets/120002392/325c5f15-a6ec-4f8f-be79-0cfd361af486)
