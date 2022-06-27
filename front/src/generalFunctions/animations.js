/* export function fadeFromTo(from, to)
{
    document.getElementById(from).classList.add('animate__animated', 'animate__fadeOut');

    setTimeout(function ()
    {	
        document.getElementById(from).style.display = "none";
        document.getElementById(to).style.display = "block";
        document.getElementById(to).classList.add('animate__animated', 'animate__fadeIn');
    }, 1000);
}  */


export function fadeFromTo(from, to)
{
    document.getElementById(from).classList.add('animate__animated', 'animate__fadeOut');
    
    setTimeout(function ()
    {	
        document.getElementById(to).style.display = "block";
        document.getElementById(to).classList.add('animate__animated', 'animate__fadeIn');
    }, 2020);
} 

export function fadeIn(to)
{
    document.getElementById(to).classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(function ()
    {	
        document.getElementById(to).classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);
} 


export function fadeInFadeOut(id)
{
    document.getElementById(id).classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(function(){document.getElementById(id).classList.add('animate__animated', 'animate__fadeOut');}, 2500);

    setTimeout(function()
    {
        document.getElementById(id).classList.remove('animate__animated', 'animate__fadeIn');
        document.getElementById(id).classList.remove('animate__animated', 'animate__fadeOut');
        document.getElementById(id).textContent = "";
        document.getElementById(id).style.display = "block";
    }, 3000);
}

export function clearInputs(arrayDeInputs)
{
    for(var i = 0; i < arrayDeInputs.length; i++)
    {
        document.getElementById(arrayDeInputs[i]).value = "";
    }
}