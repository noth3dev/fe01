const userName = "Notth3dev"; 
const score = 220000; 
const playerLevel = 7;

const gamesPlayed = 192;
const winRate = 200;
const highestStreak = 15;
const userNumber = 956;

document.addEventListener('DOMContentLoaded', () => {

    const tierMap = {
        bronze: { threshold: 0, levels: [1000, 2000, 3000, 4000, 5000] },       
        silver: { threshold: 15000, levels: [1500, 2500, 3500, 4500, 5500] },   
        gold: { threshold: 32500, levels: [2000, 3000, 4000, 5000, 6000] },     
        platinum: { threshold: 52500, levels: [2500, 3500, 4500, 5500, 6500] }, 
        diamond: { threshold: 77500, levels: [3000, 4000, 5000, 6000, 7000] },  
        emerald: { threshold: 107500, levels: [3500, 4500, 5500, 6500, 7500] }, 
        conqueror: { threshold: 147500, levels: [4000, 5000, 6000, 7000, 8000] }, 
        lumen: { threshold: 177500, levels: [4500, 5500, 6500, 7500, 8500] },   
    };

    let highestRank = '';
    let tierName = '';
    let tierAbbreviation = '';
    let tierLevel = '';
    let tierColor = '';
    let userCurrentExp = 0;
    let maxExpForLevel = 0;

    for (const [tier, data] of Object.entries(tierMap)) {
        if (score >= data.threshold) {
            tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
            tierAbbreviation = tierName.charAt(0).toUpperCase();

            let tierScore = score - data.threshold;
            for (let i = 0; i < data.levels.length; i++) {
                if (tierScore < data.levels[i]) {
                    tierLevel = i + 1;
                    userCurrentExp = tierScore;
                    maxExpForLevel = data.levels[i];
                    highestRank = `${tierName} ${['I', 'II', 'III', 'IV', 'V'][i]}`;
                    break;
                }
                tierScore -= data.levels[i];
            }

            switch (tier) {
                case 'bronze':
                    tierColor = 'var(--tier_bronze)';
                    break;
                case 'silver':
                    tierColor = 'var(--tier_silver)';
                    break;
                case 'gold':
                    tierColor = 'var(--tier_gold)';
                    break;
                case 'platinum':
                    tierColor = 'var(--tier_platinum)';
                    break;
                case 'diamond':
                    tierColor = 'var(--tier_diamond)';
                    break;
                case 'emerald':
                    tierColor = 'var(--tier_emerald)';
                    break;
                case 'conqueror':
                    tierColor = 'var(--tier_conqueror)';
                    break;
                case 'lumen':
                    tierColor = 'var(--tier_lumen)';
                    break;
            }
        }
    }

    const highestRankElement = document.getElementById('highest-rank');
    if (highestRankElement) {
        highestRankElement.textContent = highestRank;
    }

    const totalGamesElement = document.getElementById('total-games');
    if (totalGamesElement) {
        totalGamesElement.textContent = gamesPlayed;
    }

    const winRateElement = document.getElementById('win-rate');
    if (winRateElement) {
        winRateElement.textContent = winRate;
    }

    const highestStreakElement = document.getElementById('highest-streak');
    if (highestStreakElement) {
        highestStreakElement.textContent = highestStreak;
    }

    const userNumberElement = document.getElementById('user-number');
    if (userNumberElement) {
        userNumberElement.textContent = `#${userNumber}`;
    }

    const usernameElements = document.querySelectorAll('.username');
    usernameElements.forEach(element => {
        element.textContent = userName;
    });

    const userlvElements = document.querySelectorAll('.userlv');
    if (userlvElements.length > 0) {
        const formattedLevel = playerLevel < 10 ? `0${playerLevel}` : `${playerLevel}`;
        userlvElements.forEach((element) => {
            element.textContent = formattedLevel;
        });
    }

    const currentLevelElement = document.getElementById('current-level');
    const levelMaxElement = document.getElementById('level-max');
    if (currentLevelElement && levelMaxElement) {
        setProgressBarWidth(currentLevelElement, levelMaxElement);
    }

    const root = document.documentElement;
    if (tierColor) {
        root.style.setProperty('--user_tier', tierColor);
    }

    const rankedTierElement = document.querySelector('.ranked-tier');
    if (rankedTierElement) {
        rankedTierElement.textContent = `${tierName} ${tierLevel}`;
    }

    const highlightTierElements = document.querySelectorAll('.highlight-tier');
    if (highlightTierElements.length > 0) {
        highlightTierElements.forEach(element => {
            element.innerHTML = `<sup>${tierAbbreviation}${tierLevel}</sup>`;
        });
    }

    const progressTitleElement = document.querySelector('.progress-title');
    if (progressTitleElement) {
        const leagueThresholds = [
            0, 16500, 33000, 49500, 66000, 82500, 99000, 115500, 
            132000, 148500, 165000, 181500, 198000, 214500, 231000, 247500
        ];

        let leagueLevel = 1; 
        for (let i = 0; i < leagueThresholds.length - 1; i++) {
            if (score >= leagueThresholds[i] && score < leagueThresholds[i + 1]) {
                leagueLevel = i + 1;
                break;
            }
        }
        progressTitleElement.textContent = `League ${leagueLevel}`;
    }
});

function setProgressBarWidth(currentLevelElement, levelMaxElement) {
    const progressBarFillElement = document.querySelector('.progress-bar-fill');
    if (progressBarFillElement && currentLevelElement && levelMaxElement) {
        const currentLevel = parseInt(currentLevelElement.textContent, 10);
        const levelMax = parseInt(levelMaxElement.textContent, 10);
        if (!isNaN(currentLevel) && !isNaN(levelMax) && levelMax > 0) {
            const progressPercentage = (currentLevel / levelMax) * 100;
            progressBarFillElement.style.width = `${progressPercentage}%`;
        }
    }
}