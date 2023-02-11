const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')
require('colors')

// Імпортуєсмо модулі та пакети
// fs - модуль для роботи з пакетами
//  path- модуль для роботи зі шляхами
//  nanoid. colors- npm пакети

const contactsPath = path.join(__dirname, 'db', 'contacts.json')
// Прописуємо щлях до нашоі БД через метод path.join (об'єднує усі елементи в строку), де _dirname - це абсолютний шлях до скрипта, назва папки, назва файлу.

const listContacts = async () => {
	try {
        const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' })
        return JSON.parse(contacts)        
       
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
    }     
}
// Робимо асинхроний запит за допомогою метода readFile - зчитування файла, utf-8 - розкодировка Buffer
// JSON.parse - створюємо зі строки об'єкт.

const getContactById = async contactId => {
	try {
        const contacts = await listContacts()
        return contacts.filter(({ id }) => id === contactId)
        
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
    }
}

const removeContact = async contactId => {
	try {
		const contacts = await listContacts()
		const newContacts = contacts.filter(({ id }) => id !== contactId)
		await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), { encoding: 'utf-8' })

		return newContacts
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}

// Робимо асинхроний запит за допомогою метода writeFile - запис(новий контакт ID ) у файл, якщо id контакту нема в начальному об'єкті. (null - начальне значення, 2- кількість пробілів на кожний рівень іерархії)

const addContact = async (name, email, phone) => {
    try {
        
		const contacts = await listContacts()
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		}
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' })
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`.red)
	}
}
// Робимо асинхроний запит за допомогою метода writeFile - запис(новий контакт елементи) у файл,

listContacts()

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}
// Робимо експорт модулів