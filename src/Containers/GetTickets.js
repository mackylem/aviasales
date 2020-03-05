const searchUrl = 'https://front-test.beta.aviasales.ru/search';

class GetTickets {

	async getSearchId() {
		const req = await fetch(searchUrl, {
			method: 'GET',
		});
		const {searchId} = await req.json();
		return searchId;
	}

	async getTickets(searchId) {
		try {
			const ticketUrl = 'https://front-test.beta.aviasales.ru/tickets?searchId=' + searchId;
			const req = await fetch(ticketUrl, {
				method: 'GET',
			});
			const tickets = await req.json();
			return tickets;
		} catch (error) {
			return {};
		}

	}

	async getListTickets(searchId) {
		let list = [];
		let tickets = await this.getTickets(searchId);
		while ((tickets.stop === false) || (tickets === {})) {
			if (tickets !== {}) {
				list = [...list, ...tickets.tickets]
				tickets = await this.getTickets(searchId);
			} else {
				tickets = await this.getTickets(searchId);
			}
		}
		return await list;
	}
}

export default GetTickets;
