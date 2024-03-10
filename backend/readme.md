# Backend

<details open>
<summary><i><b>Table of contents:</b></i></summary>
    <br />
    <ul>
        <li>Tech stack</li>
        <li>Express server</li>
        <li>Flask server</li>
        <li>Architecture diagram</li>
    </ul>
</details>

<details>
<summary><i><b>Tech stack:</b></i></summary>

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

</details>

The backend part of the application comprises of two separate parts to classify the backend in a modular manner, which are,

<details open>
<summary><b><i>An Express.js server:</i></b></summary>
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
</details>
<details open>
<summary><b><i>A Flask server:</i></b></summary>
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
</details>
<details open>
<summary><b><i>Architecture:</b></i></summary>
    <br />
    ![image](https://github.com/t-aswath/mdeditor/assets/120002392/325c5f15-a6ec-4f8f-be79-0cfd361af486)

</details>
