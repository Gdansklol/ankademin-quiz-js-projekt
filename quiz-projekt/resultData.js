export const resultData = [
    {
     condition: (percentage)=> percentage < 50,
     message: (score, total, percentage) => 
        `Underkänt: ${score} av ${total} (${percentage.toFixed(0)}%)`,
     color: "red",
    },
    {
        condition: (percentage)=> percentage <= 75,
        message: (score, total, percentage) => 
           `Bra: ${score} av ${total} (${percentage.toFixed(0)}%)`,
        color: "orange",
       },
       {
        condition: (percentage)=> percentage > 75,
        message: (score, total, percentage) => 
           `Riktigt bra jobbat: ${score} av ${total} (${percentage.toFixed(0)}%)`,
        color: "green",
       },
];