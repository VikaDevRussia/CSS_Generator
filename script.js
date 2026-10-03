const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const directionInput = document.getElementById('direction');
const radiusInput = document.getElementById('radius');
const radiusValueSpan = document.getElementById('radiusValue');
const textColorInput = document.getElementById('textColor');
const previewBox = document.getElementById('previewBox');
const copyFullBtn = document.getElementById('copyFullBtn');

const tabBtns = document.querySelectorAll('.tab-btn');
const snippetContents = document.querySelectorAll('.snippet-content');
const snippetTexts = document.querySelectorAll('.snippet-text');
const copySnippetBtns = document.querySelectorAll('.copy-snippet-btn');

const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

function updatePreview() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const direction = directionInput.value;
    const radius = radiusInput.value + 'px';
    const textColor = textColorInput.value;

    previewBox.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
    previewBox.style.borderRadius = radius;
    previewBox.style.color = textColor;
    radiusValueSpan.textContent = radius;
}

function updateSnippets() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const direction = directionInput.value;
    const radius = radiusInput.value + 'px';
    const textColor = textColorInput.value;

    snippetTexts[0].value = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    snippetTexts[1].value = `border-radius: ${radius};`;
    snippetTexts[2].value = `color: ${textColor};`;
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

copySnippetBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const textarea = snippetTexts[index];
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textarea.value).then(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
            btn.style.background = 'var(--success)';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-copy"></i> Копировать';
                btn.style.background = 'var(--primary)';
                btn.disabled = false;
            }, 1500);
        });
    });
});

copyFullBtn.addEventListener('click', () => {
    const fullCss = `
.container {
    background: linear-gradient(${directionInput.value}, ${color1Input.value}, ${color2Input.value});
    border-radius: ${radiusInput.value}px;
    color: ${textColorInput.value};
}
`.trim();
    navigator.clipboard.writeText(fullCss).then(() => {
        copyFullBtn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
        copyFullBtn.style.background = 'var(--success)';
        copyFullBtn.disabled = true;
        setTimeout(() => {
            copyFullBtn.innerHTML = '<i class="fa-solid fa-code"></i> Скопировать весь CSS';
            copyFullBtn.style.background = 'var(--primary)';
            copyFullBtn.disabled = false;
        }, 1500);
    });
});

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        snippetContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

[color1Input, color2Input, directionInput, radiusInput, textColorInput].forEach(input => {
    input.addEventListener('input', () => {
        updatePreview();
        updateSnippets();
    });
});

themeToggleBtn.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    updatePreview();
    updateSnippets();
});