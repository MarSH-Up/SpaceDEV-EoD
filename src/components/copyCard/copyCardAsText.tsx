import React from "react";

const copyCardAsText = async (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    let text = (card.getElementsByClassName("cardBig__title")[0] as HTMLDivElement).innerText + "\n";
    text += (card.getElementsByClassName("cardBig__date")[0]as HTMLDivElement).innerText + "\n\n";
  
    const listItems = card.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
      text += `${i + 1}. ${listItems[i].innerText}\n`;
    }
  
    try {
        await navigator.clipboard.writeText(text);
        alert("Your report is copied!");
    } catch (error) {
        console.error(error);
        alert("Could not copy the text. Please try again.");
    }
  };

  export default copyCardAsText;