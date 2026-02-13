export type Language = 'en' | 'sw' | 'fr' | 'es' | 'ru' | 'zh' | 'ko';

export interface Translation {
    settings: {
        language: string;
        theme: string;
        about: string;
        contact: string;
        close: string;
    };
    about: {
        title: string;
        description: string;
        description2: string;
    };
    nameInput: {
        title: string;
        subtitle: string;
        question: string;
        placeholder: string;
        button: string;
        error: string;
    };
    proposal: {
        title: string;
        yes: string;
        no_phrases: string[];
        footer_no_choice: string;
        footer_crying: string;
        footer_heartbreak: string;
    };
    celebration: {
        title: string;
        quote: string;
        message: string;
        tags: [string, string];
        footer: string;
    };
}

export const translations: Record<Language, Translation> = {
    en: {
        settings: {
            language: "Language",
            theme: "Theme",
            about: "About",
            contact: "Contact Dev",
            close: "Close"
        },
        about: {
            title: "About This Page",
            description: "A romantic digital experience designed to express love and ask that special question.",
            description2: "Created with passion by AIZIKAY."
        },
        nameInput: {
            title: "Wait a second... ✋",
            subtitle: "I was just about to ask you something super important, but I got distracted by your cuteness! 🥺",
            question: "Wait, what's your nickname again, cutie? Can you remind me? 😉",
            placeholder: "Type your nickname...",
            button: "That's me!",
            error: "Hey! Don't leave me hanging! 🥺"
        },
        proposal: {
            title: "Will you be my Valentine, {name}?",
            yes: "Yes 💖",
            no_phrases: [
                "No 😅", "Are you sure?", "Really sure?", "Think again!", "Last chance!",
                "Surely not?", "You might regret this!", "Give it another thought!",
                "Are you absolutely certain?", "This could be a mistake!", "Have a heart!",
                "Don't be so cold!", "Change of heart?", "Wouldn't you reconsider?",
                "Is that your final answer?", "You're breaking my heart ;(", "Plsss? 🥺"
            ],
            footer_no_choice: "Okay, you have no choice now! 😈",
            footer_crying: "(I'm not crying, you are... 🥺)",
            footer_heartbreak: "Don't break my heart..."
        },
        celebration: {
            title: "Yeeessss! 💕",
            quote: "My heart is and always will be yours.",
            message: "You just made this the most magical Valentine's Day ever. I can't wait to celebrate every moment with you!",
            tags: ["Perfect Match", "Love is in the air"],
            footer: "Happy Valentine's Day!"
        }
    },
    sw: {
        settings: {
            language: "Lugha",
            theme: "Mandhari",
            about: "Kuhusu",
            contact: "Wasiliana",
            close: "Funga"
        },
        about: {
            title: "Kuhusu Ukurasa Huu",
            description: "Ukurasa maalum wa kidijitali ulioundwa kwa ajili ya kuonyesha upendo na kuuliza swali hilo muhimu.",
            description2: "Imetengenezwa kwa upendo na AIZIKAY."
        },
        nameInput: {
            title: "Subiri kidogo... ✋",
            subtitle: "Nilikuwa karibu kukuuliza jambo muhimu sana, lakini nilipotezwa na uzuri wako! 🥺",
            question: "Hivi, jina lako la utani ni nani vile, mrembo? Nikumbushe? 😉",
            placeholder: "Andika jina lako...",
            button: "Ndiye mimi!",
            error: "Wewe! Usiniache hivi! 🥺"
        },
        proposal: {
            title: "Utakuwa Valentine wangu, {name}?",
            yes: "Ndio 💖",
            no_phrases: [
                "Hapana 😅", "Una uhakika?", "Kweli kabisa?", "Fikiria tena!", "Nafasi ya mwisho!",
                "Haiwezekani!", "Utajuta!", "Fikiria mara mbili!",
                "Una uhakika asilimia 100?", "Hii inaweza kuwa kosa!", "Kuwa na huruma!",
                "Usiwe katili!", "Badilisha mawazo?", "Hutafikiria tena?",
                "Hilo ndilo jibu la mwisho?", "Unavunja moyo wangu ;(", "Tafadhali? 🥺"
            ],
            footer_no_choice: "Sawa, huna chaguo sasa! 😈",
            footer_crying: "(Silii, ni wewe unalia... 🥺)",
            footer_heartbreak: "Usivunje moyo wangu..."
        },
        celebration: {
            title: "Ndioooo! 💕",
            quote: "Moyo wangu ni wako na utakuwa wako daima.",
            message: "Umefanya hii iwe Siku ya Valentine ya kipekee zaidi. Siwezi kusubiri kusherehekea kila wakati nawe!",
            tags: ["Mechi Kamili", "Upendo hewani"],
            footer: "Heri ya Siku ya Valentine!"
        }
    },
    fr: {
        settings: {
            language: "Langue",
            theme: "Thème",
            about: "À propos",
            contact: "Contact",
            close: "Fermer"
        },
        about: {
            title: "À propos de cette page",
            description: "Une expérience numérique romantique conçue pour exprimer l'amour et poser cette question spéciale.",
            description2: "Créé avec passion par AIZIKAY."
        },
        nameInput: {
            title: "Attends une seconde... ✋",
            subtitle: "J'allais te demander quelque chose de très important, mais j'ai été distrait par ta beauté ! 🥺",
            question: "Attends, c'est quoi ton surnom déjà ? Tu peux me rappeler ? 😉",
            placeholder: "Tape ton surnom...",
            button: "C'est moi !",
            error: "Hé ! Ne me laisse pas comme ça ! 🥺"
        },
        proposal: {
            title: "Veux-tu être ma Valentine, {name} ?",
            yes: "Oui 💖",
            no_phrases: [
                "Non 😅", "Tu es sûr(e) ?", "Vraiment ?", "Réfléchis encore !", "Dernière chance !",
                "Sûrement pas ?", "Tu pourrais le regretter !", "Penses-y encore !",
                "Es-tu absolument certain(e) ?", "Ça pourrait être une erreur !", "Aie un cœur !",
                "Ne sois pas si froid(e) !", "Tu changes d'avis ?", "Tu ne veux pas reconsidérer ?",
                "C'est ton dernier mot ?", "Tu brises mon cœur ;(", "S'il te plaît ? 🥺"
            ],
            footer_no_choice: "D'accord, tu n'as plus le choix maintenant ! 😈",
            footer_crying: "(Je ne pleure pas, c'est toi... 🥺)",
            footer_heartbreak: "Ne brise pas mon cœur..."
        },
        celebration: {
            title: "Ouiiiii ! 💕",
            quote: "Mon cœur est et sera toujours à toi.",
            message: "Tu viens de rendre cette Saint-Valentin la plus magique de toutes. J'ai hâte de célébrer chaque moment avec toi !",
            tags: ["Match Parfait", "L'amour est dans l'air"],
            footer: "Joyeuse Saint-Valentin !"
        }
    },
    es: {
        settings: {
            language: "Idioma",
            theme: "Tema",
            about: "Acerca de",
            contact: "Contacto",
            close: "Cerrar"
        },
        about: {
            title: "Sobre esta página",
            description: "Una experiencia digital romántica diseñada para expresar amor y hacer esa pregunta especial.",
            description2: "Creado con pasión por AIZIKAY."
        },
        nameInput: {
            title: "Espera un segundo... ✋",
            subtitle: "Estaba a punto de preguntarte algo súper importante, ¡pero me distraje con tu belleza! 🥺",
            question: "Espera, ¿cuál es tu apodo? ¿Me lo recuerdas? 😉",
            placeholder: "Escribe tu apodo...",
            button: "¡Soy yo!",
            error: "¡Oye! ¡No me dejes así! 🥺"
        },
        proposal: {
            title: "¿Quieres ser mi San Valentín, {name}?",
            yes: "Sí 💖",
            no_phrases: [
                "No 😅", "¿Seguro/a?", "¿De verdad?", "¡Piénsalo bien!", "¡Última oportunidad!",
                "¿Seguramente no?", "¡Te arrepentirás!", "¡Piénsalo otra vez!",
                "¿Estás absolutamente seguro/a?", "¡Esto podría ser un error!", "¡Ten corazón!",
                "¡No seas tan frío/a!", "¿Cambiaste de opinión?", "¿No lo reconsiderarías?",
                "¿Es tu respuesta definitiva?", "Me estás rompiendo el corazón ;(", "¿Por favor? 🥺"
            ],
            footer_no_choice: "¡Vale, ya no tienes opción! 😈",
            footer_crying: "(No estoy llorando, tú estás... 🥺)",
            footer_heartbreak: "No rompas mi corazón..."
        },
        celebration: {
            title: "¡Sííííí! 💕",
            quote: "Mi corazón es y siempre será tuyo.",
            message: "Acabas de hacer de este San Valentín el más mágico de todos. ¡No puedo esperar a celebrar cada momento contigo!",
            tags: ["Pareja Perfecta", "El amor está en el aire"],
            footer: "¡Feliz San Valentín!"
        }
    },
    ru: {
        settings: {
            language: "Язык",
            theme: "Тема",
            about: "О нас",
            contact: "Контакт",
            close: "Закрыть"
        },
        about: {
            title: "Об этой странице",
            description: "Романтический цифровой опыт, созданный для выражения любви и того самого вопроса.",
            description2: "Создано со страстью AIZIKAY."
        },
        nameInput: {
            title: "Подожди секунду... ✋",
            subtitle: "Я только хотел спросить тебя о чем-то очень важном, но отвлекся на твою красоту! 🥺",
            question: "Подожди, как тебя называть? Напомни мне? 😉",
            placeholder: "Введите ваше прозвище...",
            button: "Это я!",
            error: "Эй! Не оставляй меня так! 🥺"
        },
        proposal: {
            title: "Будешь моим Валентином, {name}?",
            yes: "Да 💖",
            no_phrases: [
                "Нет 😅", "Ты уверен(а)?", "Точно?", "Подумай еще!", "Последний шанс!",
                "Точно нет?", "Ты пожалеешь!", "Подумай еще раз!",
                "Абсолютно уверен(а)?", "Это может быть ошибкой!", "Имей совесть!",
                "Не будь таким(ой) холодным(ой)!", "Передумал(а)?", "Может передумаешь?",
                "Это твой окончательный ответ?", "Ты разбиваешь мне сердце ;(", "Ну пожалуйста? 🥺"
            ],
            footer_no_choice: "Ладно, теперь у тебя нет выбора! 😈",
            footer_crying: "(Я не плачу, это ты... 🥺)",
            footer_heartbreak: "Не разбивай мне сердце..."
        },
        celebration: {
            title: "Дааааа! 💕",
            quote: "Мое сердце всегда будет твоим.",
            message: "Ты сделал(а) этот День Святого Валентина самым волшебным. Жду не дождусь отпраздновать с тобой!",
            tags: ["Идеальная пара", "Любовь витает в воздухе"],
            footer: "С Днем Святого Валентина!"
        }
    },
    zh: {
        settings: {
            language: "语言",
            theme: "主题",
            about: "关于",
            contact: "联系",
            close: "关闭"
        },
        about: {
            title: "关于此页面",
            description: "专为表达爱意和提出那个特别问题而设计的浪漫数字体验。",
            description2: "由 AIZIKAY 用爱制作。"
        },
        nameInput: {
            title: "等一下... ✋",
            subtitle: "我正要问你一件超级重要的事情，但我被你的可爱分心了！🥺",
            question: "等等，你的昵称是什么来着？能提醒我吗？😉",
            placeholder: "输入你的昵称...",
            button: "是我！",
            error: "嘿！别把我晾在这！🥺"
        },
        proposal: {
            title: "你愿意做我的情人吗，{name}？",
            yes: "愿意 💖",
            no_phrases: [
                "不 😅", "你确定吗？", "真的确定？", "再想想！", "最后一次机会！",
                "肯定不？", "你会后悔的！", "再考虑一下！",
                "绝对确定吗？", "这可能是个错误！", "有点良心吧！",
                "别这么冷漠！", "回心转意了吗？", "不再考虑一下？",
                "这是你的最终答案吗？", "你伤透了我的心 ;(", "求你了？🥺"
            ],
            footer_no_choice: "好吧，你现在没得选了！😈",
            footer_crying: "（我没哭，是你... 🥺）",
            footer_heartbreak: "别伤我的心..."
        },
        celebration: {
            title: "太棒了！💕",
            quote: "我的心永远属于你。",
            message: "你让这个情人节变得无比神奇。我迫不及待想和你一起庆祝每一刻！",
            tags: ["天生一对", "爱在空气中"],
            footer: "情人节快乐！"
        }
    },
    ko: {
        settings: {
            language: "언어",
            theme: "테마",
            about: "정보",
            contact: "연락처",
            close: "닫기"
        },
        about: {
            title: "이 페이지에 대하여",
            description: "사랑을 표현하고 특별한 질문을 하기 위해 디자인된 로맨틱한 디지털 경험입니다.",
            description2: "AIZIKAY가 열정으로 만들었습니다."
        },
        nameInput: {
            title: "잠시만요... ✋",
            subtitle: "엄청 중요한 걸 물어보려 했는데, 당신의 귀여움에 정신이 팔렸어요! 🥺",
            question: "잠깐, 닉네임이 뭐였죠? 알려줄래요? 😉",
            placeholder: "닉네임을 입력하세요...",
            button: "저예요!",
            error: "저기요! 저를 무시하지 마세요! 🥺"
        },
        proposal: {
            title: "나의 발렌타인이 되어줄래, {name}?",
            yes: "응 💖",
            no_phrases: [
                "아니 😅", "확실해?", "정말?", "다시 생각해봐!", "마지막 기회!",
                "설마?", "후회할 텐데!", "한 번 더 생각해봐!",
                "정말 확실해?", "실수하는 걸지도 몰라!", "너무해!",
                "너무 차가워!", "맘 바꼈어?", "다시 생각 안 해볼래?",
                "그게 최종 대답이야?", "내 마음이 부서지고 있어 ;(", "제발? 🥺"
            ],
            footer_no_choice: "자, 이제 선택의 여지가 없어! 😈",
            footer_crying: "(나 안 울어, 네가 우는 거지... 🥺)",
            footer_heartbreak: "내 마음을 아프게 하지 마..."
        },
        celebration: {
            title: "좋았어! 💕",
            quote: "내 마음은 언제나 네 거야.",
            message: "덕분에 가장 마법 같은 발렌타인데이가 되었어. 너와 함께할 모든 순간이 기대돼!",
            tags: ["천생연분", "사랑이 가득해"],
            footer: "해피 발렌타인데이!"
        }
    }
};
