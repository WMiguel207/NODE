document.addEventListener('DOMContentLoaded', function() {
    const generateStoryBtn = document.getElementById('generate-story');
    const storyContainer = document.getElementById('story-container');
    const storyContent = document.getElementById('story-content');
    const copyStoryBtn = document.getElementById('copy-story');

    // Bancos de dados tokenizados
    const characters = {
        names: ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Julia', 'Lucas', 'Sophia'],
        traits: ['corajoso', 'curioso', 'tímido', 'brincalhão', 'sábio', 'atrevido', 'generoso', 'sonhador']
    };

    const settings = ['na floresta', 'no castelo', 'na praia', 'no espaço', 'na cidade', 'no vilarejo', 'no deserto', 'nas montanhas'];

    const actions = [
        'encontrou um tesouro',
        'descobriu um segredo',
        'perdeu algo importante',
        'viu algo estranho',
        'recebeu uma mensagem misteriosa',
        'precisou tomar uma decisão difícil'
    ];

    const dialogues = [
        "O que vamos fazer agora?",
        "Isso é incrível!",
        "Tenho medo...",
        "Eu sabia que isso aconteceria!",
        "Precisamos contar para alguém!",
        "Isso muda tudo!",
        "Nunca vi nada parecido!",
        "Você acredita no que está vendo?"
    ];

    const conclusions = [
        "E assim, eles aprenderam uma valiosa lição.",
        "No final, tudo acabou bem.",
        "Mas essa é uma história para outro dia.",
        "Eles nunca mais esqueceriam aquele dia.",
        "A aventura estava apenas começando.",
        "Isso marcou o início de uma grande amizade."
    ];

    generateStoryBtn.addEventListener('click', generateStory);
    copyStoryBtn.addEventListener('click', copyStory);

    function generateStory() {
        // Selecionar personagens aleatórios
        const char1 = getRandomElement(characters.names);
        const char2 = getRandomElement(characters.names.filter(name => name !== char1));
        const trait1 = getRandomElement(characters.traits);
        const trait2 = getRandomElement(characters.traits.filter(trait => trait !== trait1));
        
        // Selecionar outros elementos aleatórios
        const setting = getRandomElement(settings);
        const action = getRandomElement(actions);
        const dialogue1 = getRandomElement(dialogues);
        const dialogue2 = getRandomElement(dialogues.filter(d => d !== dialogue1));
        const conclusion = getRandomElement(conclusions);

        // Construir a história
        const story = `
            <p>Era uma vez ${char1}, um ${trait1}, e ${char2}, um ${trait2}, ${setting}.</p>
            <p>Um dia, eles ${action}. "${dialogue1}" disse ${char1}.</p>
            <p class="dialog">"${dialogue2}" respondeu ${char2}.</p>
            <p>${conclusion}</p>
        `;

        // Exibir a história
        storyContent.innerHTML = story;
        storyContainer.classList.remove('hidden')
    }

    function copyStory() {
        const textToCopy = storyContent.textContent
        
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('História copiada para a área de transferência!')
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                alert('Não foi possível copiar a história.')
            })
    }

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
})