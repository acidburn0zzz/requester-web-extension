import { h } from 'tsx-dom';
import { ParamConfigVisible, StringMap } from '../../../types';
import Suggestions from '../Suggestions';

import './style.scss';

interface InputProps {
    param: ParamConfigVisible;
    data: StringMap;
}

export default ({ param }: InputProps) => {
    const id = `input-${param.name}`;
    const updateRequired = () => {
        if (param.type === 'required')
            input.className = input.value ? '' : 'error';
    }
    const input = <input value={param.value} id={id} onInput={updateRequired} /> as HTMLInputElement;
    const append = typeof param.suggestionSeparator === 'string';
    const onSelect = (value: string) => {
        if (append) {
            if (input.value && param.suggestionSeparator && !input.value.endsWith(param.suggestionSeparator))
                input.value += param.suggestionSeparator;
            input.value += value;
        } else {
            input.value = value;
        }
    };
    updateRequired();
    return (
        <tr>
            <td><label for={id}>{param.label || param.name}</label></td>
            <td>
                <div class="input-wrapper">
                    {input}
                    {param.suggestions && (
                        <Suggestions label={append ? 'Append one:' : 'Pick one:'} suggestions={param.suggestions} onSelect={onSelect} />
                    )}
                </div>
            </td>
        </tr>
    );
};
