import event from '../util/event'

export const useEvents = () => {
  const alert = (options: Alert) => {
      event.emit('open-alert', options);
      if (options.timeout) {
          setTimeout(() => 
              {
                  event.emit('close-alert', options);
              }, 
              options.timeout
          );
      }
  };
  const confirm = (options: Confirm) => {
    return new Promise((resolve) => {
        event.emit('open-confirm', options);
            
        const onConfirm = () => {
            event.off('confirm', onConfirm);
            event.off('cancel', onCancel);
            resolve(true);
        };
    
        const onCancel = () => {
            event.off('confirm', onConfirm);
            event.off('cancel', onCancel);
            resolve(false);
        };
    
        event.on('confirm', onConfirm);
        event.on('cancel', onCancel);
    });
  };

  return { alert, confirm };
}
