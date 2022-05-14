prediction_1 = ""
prediction_2 = ""

Webcam.set({

    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90

})

camera = document.getElementById("camera")

Webcam.attach(camera)

function takeSnapshot() {

    Webcam.snap(function (data_uri) {

        document.getElementById("result").innerHTML = "<img src=" + data_uri + " id='captured_image'>"
    })


}

console.log("ml5.version", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CfK9A1ON-/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded Succesfully")
}

function speak() {

    synth = window.speechSynthesis
    data_1 = "The first prediction is" + prediction_1
    data_2 = "The second prediction is" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(data_1 + data_2)
    synth.speak(utterThis)
}

function check() {

    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult)

}

function gotResult(error, result) {

    if (error) {
        console.error(error)
    }
    else {
        console.log(result)

        prediction_1 = result[0].label
        prediction_2 = result[1].label

        document.getElementById("result_gesture_name").innerHTML = prediction_1
        document.getElementById("result_gesture_name2").innerHTML = prediction_2

        speak()

        if (prediction_1 == "Peace") {
            document.getElementById("result_emoji").innerHTML = "&#9996;"
        }
        else if (prediction_1 == "Great") {
            document.getElementById("result_emoji").innerHTML = "&#128077;"
        }
        else {
            document.getElementById("result_emoji").innerHTML = "&#9994;"
        }

            if (prediction_2 == "Peace") {
                document.getElementById("result_emoji2").innerHTML = "&#9996;"
            }
            else if (prediction_2 == "Great") {
                document.getElementById("result_emoji2").innerHTML = "&#128077;"
            }
            else {
                document.getElementById("result_emoji2").innerHTML = "&#9994;"
            }
        }
    }

