prediction1="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src= "'+data_uri+'">';
    });
}

console.log("ml5 version:", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ay_6jhMUU/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    var synth= window.speechSynthesis;
    speakdata1= prediction1;
    var utterthis= new SpeechSynthesisUtterance(speakdata1);
    synth.speak(utterthis);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);

}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction1="";
        if (results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
            prediction1="This is Amazing";
        }
        if (results[0].label == "Peace"){
            document.getElementById("update_emoji").innerHTML= "&#9996";
            prediction1="This is peace symbol";
        }
        if (results[0].label == "All the best"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";
            prediction1="This is all the best";
        }
        speak();
    }
    
}