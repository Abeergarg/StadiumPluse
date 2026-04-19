import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AssistantTab from '@/components/dashboard/AssistantTab';
import React from 'react';

jest.mock('@/lib/hooks', () => ({
  useGoogleAnalytics: () => ({
    trackEvent: jest.fn(),
  }),
}));
jest.mock('@/lib/sanitize', () => ({
  sanitizeText: (input: string) => input,
}));

describe('AssistantTab', () => {
  beforeEach(() => {
    // scrollIntoView is not implemented in jsdom
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders initial bot greeting', () => {
    render(<AssistantTab />);
    expect(
      screen.getByText(/Hi! I am StadiumIQ AI/i)
    ).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    render(<AssistantTab />);

    const input = screen.getByPlaceholderText('e.g. Where is the nearest restroom?');
    const sendBtn = screen.getByRole('button', { name: /Send message/i });

    // Send button should be disabled when input is empty
    expect(sendBtn).toBeDisabled();

    // Type a message
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Where is the restroom?' } });
    });

    expect(sendBtn).not.toBeDisabled();

    // Send the message
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    // User message appears in chat
    expect(screen.getByText('Where is the restroom?')).toBeInTheDocument();

    // Input should be cleared
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('shows a bot reply after a short delay', async () => {
    jest.useFakeTimers();
    render(<AssistantTab />);

    const input = screen.getByPlaceholderText('e.g. Where is the nearest restroom?');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'food' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Send message/i }));
    });

    // Fast-forward mock bot reply timer (900ms in AssistantTab)
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Bot should have replied with something from BOT_REPLIES for 'food'
    const messages = screen.getAllByText(/.+/, { selector: '.msg' });
    expect(messages.length).toBeGreaterThan(1);

    jest.useRealTimers();
  });
});
