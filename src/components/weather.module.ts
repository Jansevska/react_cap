import styled from "styled-components";

// background: linear-gradient(to right, #c7c7eb, #ccf2dd);
// background-color: #ffffff7d;

export const WeatherWrapper = styled.div`
height: 100vh;
.container {
background: white;
border-radius: 10px;
padding: 1rem;
position: absolute;
top: 35%;
left: 50%;
transform: translate(-50%, -50%);
box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
box-sizing: border-box;
color: rgba(0, 0, 0, 0.8);
background-blend-mode: overlay;
justify-content: space-between;
align-items: center;
flex-direction: column;
position: absolute;
}


.searchArea {
background: white;
margin-top: 20px;
display: flex;
justify-content: space-evenly;
align-items: center;
width: 100%;
}


.searchArea > input {
outline: none;
border: none;
border: 1px solid grey;
padding: 8px;
border-radius: 20px;
text-align: center;
width: 80%;
background: transparent;
}
.searchCircle {
background: white;
border: 1px solid grey;
width: 30px; /* Adjust the width of the circle as needed */
height: 30px; /* Ensure the height matches the width for a perfect circle */
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;


> .searchIcon {
font-size: 20px;
color: grey;
background: white;
}
}


.weatherArea {
background: white;
display: flex;
align-items: center;
flex-direction: column;
margin: 30px 0;


> .icon {
font-size: 9rem;
background: white;



/* DO LATER NOT WHEN CREATING UI */
}


> h1 {
font-size: 3rem;
background: white;


font-family: "Bebas Neue", sans-serif;
}


> span {
background: white;
margin-bottom: 10px;
font-family: "Inter", sans-serif;
font-size: 2rem;
}


> h2 {
font-size: 2rem;
font-family: "Inter", sans-serif;
font-weight: 400;
background: white;
}
}

.bottomInfoArea {
display: flex;
align-items: center;
justify-content: space-around;
font-family: "Josefin Sans", sans-serif;
margin: 10px;
background: white;
);
border-radius: 12px;
padding: 10px;
border: 1px solid grey;
}
.precipitation,
.wind {
display: flex;
align-items: center;
margin: 0 20px;
background: white;


> .windIcon {
font-size: 3rem;
background: white;
}
}


.windIcon {
font-size: 2rem;
margin-right: 10px;
background: white;
}

.windInfo {
background: white;
}

.windInfo h2 {
background: white;
}

.windInfo p {
background: white;
}


.loading {
background: white;
height: 400px;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
z-index: 9999;


.loadingIcon {
font-size: 3rem;
background: white;

/* DO LATER NOT WHEN CREATING UI */
animation: spin 2s linear infinite;
}
p {
font-size: 22px;
margin-top: 10px;
font-family: "Josefin Sans", sans-serif;
background: white;
}
}


/* DO LATER NOT WHEN CREATING UI */
@keyframes spin {
from {
transform: rotate(0deg);
}
to {
transform: rotate(360deg);
}
}
`;



