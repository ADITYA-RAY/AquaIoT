# **Team billionstars | HackNitrr**

## Problem Statement :
Disposal of waste water from the industries is one of the biggest issues in the modern industrial world. This leads to pollution of water bodies and endangers the aquatic life. Factories and industries need to ensure that the effluents disposed off into these water bodies are first purified and the various risk factors are mild down as much as possible. 

However, due to various factors, the discharge of waste into river bodies is not monitored and leads to devastation of the aquatic environment. Thus, it is one of the needs of the time, to ensure that these water bodies are monitored and measured for their purity, and the governmental standards regarding the disposal of industrial effluents strictly followed. In some places, where such monitoring is performed, is done manually and thus it is neither reliable nor a scalable approach.

Thus, we need some sort of modernised solution that can be easily scaled across large areas and possibly the entire country to ensure pure water across our nation rivers.

## Objectives : :notebook_with_decorative_cover:
- To monitor the composition of water bodies near the discharge site.
- Publicize the data to the internet to pressurize the authorities.
- Track the historical data regarding the water composition.
- To survey the water bodies in difficult to reach areas.
- To evolve and innovate the entire water assessment process using IoT technologies.

# **Solution :**  	:key:

## **AquaIoT**
AquaIoT is a real time water quality assessment and broadcasting system <br> <br>

AquaIoT is a system that can be used by individuals for tracking the composition of water bodies across the country. The best feature of this system is that it publicizes the entire data regarding the water bodies. The data being in the public domain is always good as it raises the awareness among the people of our nation. 

The IoT kit can be used to measure various different polluting parameters inside the water bodies such as pH, TDS (Total Dissolved Solids), temperature, harmful chemical compounds such as fluorides, hydrocarbons and poisonous metals such as arsenic, mercury, etc. Regular measurement of these quantities will ensure that their levels do not rise above their permissible values. Our prototype as of now only measures pH, TDS and temperature, however it can be easily scaled as and when requirements arise.

## Product :
1. IoT hardware setup consisting of a PCB and multiple sensors.
2. Cloud based service for storing of all the sensor data along with authenticating maintainers and activating the IoT hardware.

## Tech Stack to be used : 
![Next JS] (https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS] (https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Django] (https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![Django Rest] (https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white)
![Arduino] (https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
![Postgresql] (https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Git] (https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Github] (https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

A cloud based system is used which registers, logins and authenticate special "maintainers", who are individuals that reach the locations and install the sensors. Once these maintainers register themselves on our platform, they are provided with an IoT kit containing different sensors for the measurement of various water polluting parameters. When installing such a kit at the location of interest, they generate a special UUID from the server, which is fed into the IoT kit. This activates the kit and connects it to the server
