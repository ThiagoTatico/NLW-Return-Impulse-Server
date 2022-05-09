import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// Spy functions
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

// async () => {}
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy}
);

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,dhjffhdsfdsfs'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });


  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,dhjffhdsfdsfs'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,dhjffhdsfdsfs'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'teste.png'
    })).rejects.toThrow();
  });
});