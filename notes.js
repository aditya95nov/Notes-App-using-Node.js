console.log('notes.js started');

var fs = require('fs');

var fetchNotes = () => {
	try{
		StringNotes = fs.readFileSync('MyNotes.txt');
		return JSON.parse(StringNotes);
	}	catch(e){	
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('MyNotes.txt', JSON.stringify(notes));
}


var add = (title,body) => {
	var notes = [];
	var note = {title,body};
	var StringNotes;
	
	notes = fetchNotes();
	
	var duplicateNotes = notes.filter((note) => note.title === title);
		if(duplicateNotes.length === 0)
		{		
			notes.push(note);	
			saveNotes(notes);
			return note;
		}
		
};


var remove = (title) => {
	var notes = [];
	var note = {title};
	var StringNotes;
	
	notes = fetchNotes();
	
	var filteredNotes = notes.filter((note) => note.title !== title);
		
	saveNotes(filteredNotes);
	
	return notes.length !== filteredNotes.length;
};

var read = (title) => {
	var notes = [];
	var note = {title};
	var StringNotes;
	
	notes = fetchNotes();
	
	var filteredNotes = notes.filter((note) => note.title === title);
		
	console.log('filterednote', filteredNotes[0]);
	
	return filteredNotes[0];
};

var getAll = () => fetchNotes();

module.exports={
	add,
	remove,
	read,
	getAll
};