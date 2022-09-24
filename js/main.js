// to init the speech synth api
const synth = window.speechSynthesis;


//dom elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#textInput');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rateValue');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitchValue');
const voiceSelect = document.querySelector('#voiceSelect');
const body = document.querySelector('body');

let voices = [];
const getVoices = () => {
    voices = synth.getVoices();

    // loop through the voices   
    voices.forEach(voice => {
        //create a option element
        const option = document.createElement('option');
        //fill option with lang and voice
        option.textContent = voice.name + '(' + voice.lang + ')';
        console.log(option);
        //set needed option attribute
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceSelect.appendChild(option);

    })
}
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
// more voices are avialble on chrome than brave use that

//speak function

const speak = () => {



    // check if speaking
    if (synth.speaking) {
        console.error('Already Speaking');
        return;
    }

    if (textInput.value !== '') {
        // add background image
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //to do what when  speak end
        speakText.onend = e => {
            console.log('Done Speaking...');
            body.style.background = '#141414 ';

        }

        //speak error
        speakText.onerror = e => {
            console.error('Somethng went wrong');
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')
            //  now we loop again through the voices for the api and match the input with api looping
        voices.forEach(voice => {
                if (voice === selectedVoice) {
                    speakText.voice = voice;
                }
            })
            // set pitch and rate

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        synth.speak(speakText);
    }


};

// event listners

textForm.addEventListener('submit', e => {
    e.preventDefault(); // to actually submitting to a file
    speak();
    textInput.blur(); // to blur out or lose focus from a text field
})

//rate value  change

rate.addEventListener('change', () => {

        rateValue.textContent = rate.value;
    })
    //pitch value change
pitch.addEventListener('change', () => {

    pitchValue.textContent = pitch.value;
})

// voice select change
voiceSelect.addEventListener('change', e => {
    speak();
})