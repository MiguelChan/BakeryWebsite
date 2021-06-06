import * as React from 'react';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';
import { 
    BasicDialog, 
    DialogProperties, 
    OnButtonClickListener,
} from './BasicDialog';

describe('BasicDialog', () => {

    const mockOnAcceptClickListener = jest.fn();
    const mockOnCloseClickedListener = jest.fn();

    afterEach(() => {
        mockOnAcceptClickListener.mockClear();
        mockOnCloseClickedListener.mockClear();
    });

    it('Should display the correct dialog properties', () => {
        const dialogProperties: DialogProperties = {
            dialogTitle: 'Custom Title',
            dialogContent: 'Custom Content',
        };
        
        setupComponent(mockOnAcceptClickListener, mockOnCloseClickedListener, dialogProperties);

        expect(screen.getByText(dialogProperties.dialogTitle)).toBeInTheDocument();
        expect(screen.getByText(dialogProperties.dialogContent)).toBeInTheDocument();         
    });

    it('Should call click Listeners', () => {
        const dialogProperties: DialogProperties = {
            dialogTitle: 'Custom Title',
            dialogContent: 'Custom Content',
        };
        
        setupComponent(mockOnAcceptClickListener, mockOnCloseClickedListener, dialogProperties);

        fireEvent.click(screen.getByLabelText('Aceptar'));
        expect(mockOnAcceptClickListener).toHaveBeenCalled();

        fireEvent.click(screen.getByLabelText('Cancelar'));
        expect(mockOnCloseClickedListener).toHaveBeenCalled();
    });

    function setupComponent(
        onAcceptClickListener: OnButtonClickListener, 
        onCloseClickedListener: OnButtonClickListener, 
        dialogProperties: DialogProperties,
    ) {
        render(
            <BasicDialog 
                isOpen
                onAcceptClickListener={onAcceptClickListener}
                onCloseClickedListener={onCloseClickedListener}
                dialogProperties={dialogProperties}
            />
        );
    }

});