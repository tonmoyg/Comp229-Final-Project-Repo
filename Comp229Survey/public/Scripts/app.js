/* Group no: 6
 * Group Name: Team Star
 * Team members: Tonmoy Ghose, Sandhya Kela, Munish Bali
 * Date - March 27, 2023
 */

// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure you want to delete this survey?")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list');
                    //It points to business list
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();