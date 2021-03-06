function Transition() {

}

Transition.prototype.beforeEnter = function (el) {
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
}

Transition.prototype.enter = function(el) {
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';
}

Transition.prototype.afterEnter = function(el) {
    el.style.display = '';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
}

Transition.prototype.beforeLeave = function(el) {
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
}

Transition.prototype.leave = function(el) {
    if (el.scrollHeight !== 0) {
        setTimeout(() => {
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        });
    }
}

Transition.prototype.afterLeave = function(el) {
    el.style.display = el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
}

export default {
    functional: true,
    render(h, { children }) {
        const data = {
            on: new Transition()
        };
        children = children.map(item => {
            item.data.class = ['collapse-transition'];
            if(item.context.level === 1){
                item.data.class.push('first');
            }
            return item;
        });

        return h('transition', data, children);
    }
};
