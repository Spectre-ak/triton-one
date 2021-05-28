import { useEffect } from "react";

function Loader(){
    useEffect(()=>{
        var seconds=0;const firstMsg=60,secondMsg=120,thirdMsg=180;
        const interval=setInterval(() => {
            seconds++;
            try{
                if(seconds===firstMsg)
                    document.getElementById("infoLoading").innerHTML="<i>Starting backend...</i>";
                if(seconds===secondMsg)
                    document.getElementById("infoLoading").innerHTML="<i>Hold on...</i>";
                if(seconds===thirdMsg)
                    document.getElementById("infoLoading").innerHTML="<i>Try Loading again...</i>";
                if(seconds>=200)
                    window.location.reload();
            }
            catch(err){
                clearInterval(interval);
            }
            //console.log(seconds);
        }, 1000);
    });
    return(
        <div>
             <div class="text-center">
                <div class="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <p style={{textAlign:"center"}} id="infoLoading"><i>Just a minute...</i></p>
        </div>
       
    )
}
export default Loader;