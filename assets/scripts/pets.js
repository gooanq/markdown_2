const getPets = () => {
	let PETS = [];
	let petsList = [];
	
	const sort863 = (list) => {
		let unique8List = [];
		let length = list.length;
		for (let i = 0; i < length / 8; i++) {
			const uniqueStepList = [];
			for (j = 0; j < list.length; j++) {
				if (uniqueStepList.length >= 8) {
					break;
				}
				const isUnique = !uniqueStepList.some((item) => {
					return item === list[j];
				});
				if (isUnique) {
					uniqueStepList.push(list[j]);
					list.splice(j, 1);
					j--;
				}
			}
			unique8List = [...unique8List, ...uniqueStepList];
		}
		list = unique8List;


		list = sort6recursively(list);

		return list;
	}

	const sort6recursively = (list) => {
		const length = list.length;

		for (let i = 0; i < (length / 6); i++) {
			const stepList = list.slice(i * 6, (i * 6) + 6);

			for (let j = 0; j < 6; j++) {
				const duplicatedItem = stepList.find((item, ind) => {
					return item === stepList[j] && (ind !== j);
				});

				if (duplicatedItem !== undefined) {
					const ind = (i * 6) + j;
					const which8OfList = Math.trunc(ind / 8);

					list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

					sort6recursively(list);
				}
			}
		}

		return list;
	}

	return fetch('../../assets/scripts/pets.json').then(res => res.json()).then(list => {
		PETS = list;
		pets = list.map((item, ind) => ind);

		petsList = (() => {
			let tempArr = [];

			for (let i = 0; i < 6; i++) {
				const newPets = pets;

				for (let j = pets.length; j > 0; j--) {
					let randInd = Math.floor(Math.random() * j);
					const randElem = newPets.splice(randInd, 1)[0];
					newPets.push(randElem);
				}

				tempArr = [...tempArr, ...newPets];
			}
			return tempArr;
		})();

		petsList = sort863(petsList);
		
		return {
			PETS: PETS,
			sorted: petsList
		}
	})
}