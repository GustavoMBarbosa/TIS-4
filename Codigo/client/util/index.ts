export function formatDate(date: Date, template: any) {
	if (!(date instanceof Date) || !date) return;
	return date.toLocaleDateString('pt-BR', template);
}

export function formatTime(date: Date) {
	if (!(date instanceof Date) || !date) return;
	return date.toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function applyMask(value: string, maskType: string) {
	const digits = value.replace(/\D/g, '');

	switch (maskType.toLowerCase()) {
		case 'cep':
			return formatWithMask(digits, '#####-###');
		case 'cpf':
			return formatWithMask(digits, '###.###.###-##');
		case 'time':
			return formatWithMask(digits, '##:##');
		default:
			return value;
	}
}

export function formatWithMask(value: string, mask: string) {
	let result = '';
	let index = 0;

	for (let i = 0; i < mask.length && index < value.length; i++) {
		if (mask[i] === '#') {
			result += value[index++];
		} else {
			result += mask[i];
		}
	}

	return result;
}

export function getInitials(name: string): string {
	if (!name) return '';

	const nameParts = name.trim().split(' ');

	if (nameParts.length > 1) {
		return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
	}

	return nameParts[0].substring(0, 2).toUpperCase();
}

export function generateTemporaryPassword(length = 12) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
	let password = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		password += chars[randomIndex];
	}

	return password;
}

export function isEmailValid(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function formatCurrency(value: number) {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function upperCaseFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isSameDay(start: Date, day: Date) {
	return start.toISOString().substring(0, 10) == day.toISOString().substring(0, 10);
}

export function isBiggerDay(start: Date, day: Date) {
	return start.toISOString().substring(0, 10) > day.toISOString().substring(0, 10);
}

export function isSameHour(start: Date, hour: Date) {
	return start.getHours() == hour.getHours();
}

export function getEventByDate(event: Appointment, day: Date) {
	const parsedDay = new Date(day);

	// Remove as barras invertidas extras e caracteres inválidos
	const cleanedDates =
		event.canceledAppointmentDates?.replace(/\\/g, '').replace(/[{}]/g, '').replace(/"/g, '') || '';

	// Cria um array com as datas, separando por vírgula se houver múltiplas datas
	const canceledDates = cleanedDates ? cleanedDates.split(',').map((date) => date.trim()) : [];

	const deleted = canceledDates.find((date: string) => isSameDay(new Date(date), parsedDay));

	return (
		!deleted &&
		(isSameDay(new Date(event.startDate), parsedDay) ||
			isMonthlyEvent(event, parsedDay) ||
			isWeeklyEvent(event, parsedDay) ||
			isDailyEvent(event, parsedDay))
	);
}

export function isMonthlyEvent(event: Appointment, day: Date) {
	const startDate = new Date(event.startDate);
	return event.frequency == 'MONTHLY' && startDate.getDate() == day.getDate() && !isBiggerDay(startDate, day);
}

function isWeeklyEvent(event: Appointment, day: Date) {
	const startDate = new Date(event.startDate);
	return event.frequency == 'WEEKLY' && startDate.getDay() == day.getDay() && !isBiggerDay(startDate, day);
}

export function isDailyEvent(event: Appointment, day: Date) {
	const startDate = new Date(event.startDate);
	return event.frequency == 'DAILY' && !isBiggerDay(startDate, day);
}

export function isToday(date: Date) {
	return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) == new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}