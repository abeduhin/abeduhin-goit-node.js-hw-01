const { program } = require('commander')
// Імпортуємо program з пакету commander для створення інтерфейсу командної строки.

const { listContacts, getContactById, removeContact, addContact } = require('./contacts')

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')

// Добавляємо опції до команди program

program.parse(process.argv)
// Парсимо аргументи командного рядка
// Об'єкт process надає інформацію про поточний процес Node.js та керує ним
// process. argv - це властивість, яка містить масив значень командного рядка, наданий під час запуску поточного процесу

const argv = program.opts()
// Вилучаємо значення за допомогою program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
            const contacts = await listContacts()
           	console.table(contacts)
			break
// Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

		case 'get':
			const contact = await getContactById(id)
			console.table(contact)
			break
// Отримуємо контакт по id
// node index.js --action="get" --id=5

		case 'add':
			const newContact = await addContact(name, email, phone)
			console.table(newContact)
			break
// Додаємо контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"


		case 'remove':
			const remContact = await removeContact(id)
			console.table(remContact)
			break
// Видаляємо контакт
// node index.js --action="remove" --id=3

		default:
			console.warn('\x1B[31m Unknown action type!')
	}
}
// action - вираз, значення якого порівнюється з усіма випадками.
// case - випадок, що перевіряється на відповідність виразу
// інструкції, які виконуються, якщо вираз відповідають нагоді.
invokeAction(argv)