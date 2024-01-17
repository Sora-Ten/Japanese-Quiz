let defaultData = [
    {
        question: "その人は（　）ですか？",
        answers: [
            "だれ",
            "どなた",
            "どちら",
            "なに"
        ],
        answer: 0
    },
    {
        question: "「にほん」のかんじはどれですか？",
        answers: [
            "二本",
            "日本",
            "本日",
            "２本"
        ],
        answer: 1
    },
    {
        question: "用事がありますから、５時にうちへ（　）です",
        answers: [
            "寝たい",
            "返りたい",
            "帰りたい",
            "走りたい"
        ],
        answer: 2
    },
    {
        question: "受付（　）どこですか？",
        answers: [
            "に",
            "は",
            "で",
            "へ"
        ],
        answer: 1
    },
    {
        question: "53.100",
        answers: [
            "ごせんひゃく",
            "ごまんさんぜんひゃく",
            "ごまんさんびゃくじゅう",
            "ごまんさんびゃくいち"
        ],
        answer: 1
    },
    {
        question: "今日は金曜日です、明後日は何曜日ですか？",
        answers: [
            "木曜日",
            "日曜日",
            "水曜日",
            "月曜日"
        ],
        answer: 1
    },
    {
        question: "銀行は喫茶店と公園の（　）です",
        answers: [
            "となり",
            "あいだ",
            "なか",
            "そと"
        ],
        answer: 1
    },
    {
        question: "「男」の読み方はどちらですか？",
        answers: [
            "おす",
            "おとこ",
            "おとめ",
            "おんな"
        ],
        answer: 1
    },
    {
        question: "「富士山」の読み方どちらですか？",
        answers: [
            "ふうどうさん",
            "ふじさん",
            "かさん",
            "かざん"
        ],
        answer: 1
    },
    {
        question: "マリアさんは漢字が（　）わかりません",
        answers: [
            "とても",
            "ぜんぜん",
            "たくさん",
            "よく"
        ],
        answer: 1
    },
    {
        question: "あの人はお金が（　）あります",
        answers: [
            "とても",
            "たくさん",
            "ぜんぜん",
            "よく"
        ],
        answer: 1
    },
    {
        question: "このパンは（　）おいしいです",
        answers: [
            "たくさん",
            "とても",
            "ぜんぜん",
            "よく"
        ],
        answer: 1
    },
    {
        question: "ワンさんは英語が（　）わかります",
        answers: [
            "とても",
            "よく",
            "ぜんぜん",
            "たくさん"
        ],
        answer: 1
    },
    {
        question: "テレサちゃんダンス（　）上手です",
        answers: [
            "は",
            "が",
            "へ",
            "も"
        ],
        answer: 1
    },
    {
        question: "道を（　）とき、左と右をよく見なければなりません",
        answers: [
            "でる",
            "わたる",
            "かる",
            "ある"
        ],
        answer: 1
    },
    {
        question: "田中さんは（　）いません。独身です",
        answers: [
            "結婚します",
            "結婚して",
            "結婚した",
            "結婚する"
        ],
        answer: 1
    },
    {
        question: "今（　）ですか？",
        answers: [
            "へ",
            "何時",
            "と",
            "が"
        ],
        answer: 1
    },
    {
        question: "What is `Ya` in Katakana?",
        answers: [
            "ユ",
            "ヤ",
            "ヒ",
            "エ"
        ],
        answer: 1
    },
    {
        question: "「明けましておめでとう」の意味はなんですか？",
        answers: [
            "Happy Anniversary",
            "Happy New Year",
            "Happy Birthday",
            "Happy Forever After"
        ],
        answer: 1
    },
    {
        question: "What is `Ya`in Hiragana?",
        answers: [
            "ひ",
            "や",
            "ふ",
            "へ"
        ],
        answer: 1
    },
]
let data = [];

// randomize questions
const defaultDataLength = defaultData.length;
for(let i = 0; i < defaultDataLength; i++) {
    const random = Math.floor(Math.random() * defaultData.length);
    data.push(defaultData[random]);

    defaultData = defaultData.filter((v, i) => i !== random);
}

// randomize answers
data = data.map(v => {
    let answers = v.answers;
    let finalAnswers = [];
    let finalAnswer = v.answer;
    let textAnswer = v.answers[v.answer];
    const answersLength = answers.length;
    for(let i = 0; i < answersLength; i++) {
        const random = Math.floor(Math.random() * answers.length);
        finalAnswers.push(answers[random]);
    
        answers = answers.filter((v, i) => i !== random);
    }
    finalAnswers.forEach((v, i) => {
        if(v == textAnswer) {
            finalAnswer = i;
        }
    })

    return {
        question: v.question,
        answers: finalAnswers,
        answer: finalAnswer
    }
})


const makeChild = (question, answers) => {
    const templateChild = `<h3 style="margin-bottom: 50px;">${question}</h3>
    <div>
        <div>
            <button class="btn btn-primary btn-answer" data-index=${0}>${answers[0]}</button>
            <button class="btn btn-success btn-answer" data-index=${1}>${answers[1]}</button>
        </div>
        <div>
            <button class="btn btn-warning btn-answer" data-index=${2}>${answers[2]}</button>
            <button class="btn btn-info btn-answer" data-index=${3}>${answers[3]}</button>
        </div>
    </div>`;

    return templateChild;
}

const contentChild = document.querySelector("#content-child");
const nextBtn = document.querySelector("#next-btn");
let step = 0;
let score = 0;

const setData = (currentData) => {
    contentChild.innerHTML = makeChild(currentData.question, currentData.answers);
    setAnswerEvent();
}

const setAnswerEvent = () => {
    const currentData = data[step];
    const answerBtns = document.querySelectorAll(".btn-answer");

    answerBtns.forEach(e => {
        e.addEventListener("click", () => {
            const index = e.getAttribute("data-index");
            if (index == currentData.answer) {
                score++;
            }
            const nextData = data[step + 1];
            if (!nextData) {
                const questionLength = data.length;
                const finalScore = score / questionLength * 100;
                contentChild.innerHTML = `<h3>Selamat anda sudah menjawab semua soal</h3>
                <p>Score yang anda peroleh adalah: ${Math.floor(finalScore)}</p>
                <button class="btn btn-success" id="refresh-btn">Back to home</button>`;
                document.querySelector("#refresh-btn").addEventListener("click", () => {
                   window.location.reload(); 
                });
                return;
            }
            step++;
            setData(nextData);
        })
    })
}

nextBtn.addEventListener('click', () => {
    const currentData = data[step];
    setData(currentData);
})




// toggle theme handle
const toggleEl = document.querySelector("#toggle-theme");
toggleEl.addEventListener("change", el => {
    const target = el.target;
    if (target.checked) {
        document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
        document.querySelector("html").setAttribute("data-theme", "light");
    }

})
//need question limiter and show display right and wrong answer in the end or by alert