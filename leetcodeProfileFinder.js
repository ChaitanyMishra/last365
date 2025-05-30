document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.progress');
    const input = document.querySelector('#inputId');
    const searchButton = document.querySelector('#button');
    const easySection = document.querySelector('#easy_1');
    const mediumSection = document.querySelector('#medium_1');
    const hardSection = document.querySelector('#hard_1');
    const cardStatsDive = document.querySelector('.cardStats');
    const easyStats = document.querySelector('#easyStats')
    const mediumStats = document.querySelector('#mediumStats')
    const hardStats = document.querySelector('#hardStats')
    const apiUrl = 'https://leetcode-stats-api.herokuapp.com/';

    const validateInput = (input) => {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        return usernameRegex.test(input);
    };

    const showData = (userInfo) => {

        console.log(userInfo)
        easySection.textContent = `${userInfo.easySolved} / ${userInfo.totalEasy}`
        mediumSection.textContent = `${userInfo.mediumSolved} / ${userInfo.totalMedium}`
        hardSection.textContent = `${userInfo.hardSolved} / ${userInfo.totalHard}`
        easyStats.textContent = `Easy Solved : ${userInfo.easySolved}`
        mediumStats.textContent = `Medium Solved : ${userInfo.mediumSolved}`
        hardStats.textContent = `Hard Solved : ${userInfo.hardSolved}`

        cardStatsDive.innerHTML = `
        <h2 style="color:yellow";>Stats</h2>
        <p><strong>Total Solved:</strong> ${userInfo.totalSolved} / ${userInfo.totalQuestions}</p>
        <p><strong>Acceptance Rate:</strong> ${userInfo.acceptanceRate}%</p>
        <p><strong>Ranking:</strong> ${userInfo.ranking}</p>
        <p><strong>Reputation:</strong> ${userInfo.reputation}</p>
    `;
        projectChart(userInfo);
        
    }

    
    function projectChart(userInfoData){
        const easyProgressPersent = (userInfoData.easySolved / userInfoData.totalEasy) * 100; 
        const mediumProgressPersent = (userInfoData.mediumSolved / userInfoData.totalMedium) * 100;
        const hardProgressPersent = (userInfoData.hardSolved / userInfoData.totalHard) * 100;
    
        easySection.style.setProperty("--progressEasy" , `${easyProgressPersent}%`);
        mediumSection.style.setProperty("--progressMedium" , `${mediumProgressPersent}%`)
        hardSection.style.setProperty("--progressHard" , `${hardProgressPersent}%`)
    }

    const profileFinder = async (userInput) => {
        try {
            searchButton.textContent = 'Searching...'
            searchButton.disabled = true;
            const response = await fetch(`${apiUrl}${userInput}`);
            if (!response.ok) {
                throw new Error(`${userInput} not found`);
            }
            const userData = await response.json();
            showData(userData);
        } catch (error) {
            alert(error.message);
        }finally{
            searchButton.textContent = 'Search'
            searchButton.disabled = false;
        }
    };

    searchButton.addEventListener('click', () => {
        const userInput = input.value.trim();
        input.value = "";

        if (userInput === "" || !validateInput(userInput)) {
            alert("Please enter a valid LeetCode username");
            return;
        }

        profileFinder(userInput);
        
    });
});
