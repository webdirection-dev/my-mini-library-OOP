export default class Customizator {
    constructor() {
        this.body = document.querySelector('body');

        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');
        this.clear = document.createElement('div');

        this.btnBlock.addEventListener('click', (event) => this.onScaleChange(event));
        this.colorPicker.addEventListener('input', (event) => this.onColorChange(event));
        this.clear.addEventListener('click', () => this.reset());

        this.scale = localStorage.getItem('scale') || 1;
        this.color = localStorage.getItem('color') || '#ffffff';
    }

    // FONT SIZES
    onScaleChange(event) {
        if (event) this.scale = +event.target.value.replace(/x/g, '');

        const recursy = elem => {
            elem.childNodes.forEach(item => {
                if (item.nodeName === '#text' && item.nodeValue.replace(/\s+/g, '').length > 0) {

                    if (!item.parentNode.getAttribute('data-fs')) {
                        let value = window.getComputedStyle(item.parentNode, null).fontSize;
                        item.parentNode.setAttribute('data-fs', +value.replace(/px/g, ''));
                        item.parentNode.style.fontSize =  item.parentNode.getAttribute('data-fs') * this.scale + 'px';
                    } else item.parentNode.style.fontSize =  item.parentNode.getAttribute('data-fs') * this.scale + 'px';

                } else recursy(item);
            });
        }

        recursy(this.body);
        // LOCAL STORAGE
        localStorage.setItem('scale', this.scale);
    }

    // COLOR CHANGE
    onColorChange(event) {
        this.body.style.backgroundColor = event.target.value;
        // LOCAL STORAGE
        localStorage.setItem('color', event.target.value)
    }

    // CLASSES
    injectStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            .panel {
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: fixed;
                top: 10px;
                right: 0;
                border: 1px solid rgba(0,0,0, .2);
                box-shadow: 0 0 20px rgba(0,0,0, .5);
                width: 300px;
                height: 60px;
                background-color: #fff;
            
            }
            
            .scale {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100px;
                height: 40px;
            }
            
            .scale_btn {
                display: block;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0,0,0, .2);
                border-radius: 4px;
                font-size: 18px;
            }
            
            .color {
                width: 40px;
                height: 40px;
            }
            
            .clear {
                font-size: 20px;
                cursor: pointer;
            }
        `;
        document.querySelector('head').appendChild(style)
    }

    // LOCAL STORAGE
    setBgColor() {
        this.body.style.backgroundColor = this.color;
        this.colorPicker.value = this.color;
    }

    reset() {
        localStorage.clear();

        this.scale = 1;
        this.color = '#ffffff';

        this.setBgColor();
        this.onScaleChange();
    }

    render() {
        this.injectStyle();
        this.setBgColor();
        this.onScaleChange();

        let scaleInputSmall = document.createElement('input'),
            scaleInputMedium = document.createElement('input'),
            panel = document.createElement('div');

        // HTML
        this.clear.innerHTML = `&times`;

        // Classes
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');
        this.clear.classList.add('clear');
        panel.classList.add('panel');
        scaleInputSmall.classList.add('scale_btn');
        scaleInputMedium.classList.add('scale_btn');

        // Attributes
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        scaleInputSmall.setAttribute('type', 'button');
        scaleInputSmall.setAttribute('value', '1x');

        scaleInputMedium.setAttribute('type', 'button');
        scaleInputMedium.setAttribute('value', '1.5x');

        // Rendering
        // document.body.append(panel);
        document.querySelector('body').append(panel);
        panel.append(this.btnBlock, this.colorPicker, this.clear);
        this.btnBlock.append(scaleInputSmall, scaleInputMedium);
    }
}