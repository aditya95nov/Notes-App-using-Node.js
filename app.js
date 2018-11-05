console.log('app.js started');

var fs = require('fs');
var yargs = require('yargs');
var notes = require('./notes.js');

var titleOptions = {
				describe:  'description of the note',
				demand: true,
				alias: 't'
			};

var bodyOptions = {
				describe:  'description of the Body',
				demand: true,
				alias: 'b'
			};

var argv = yargs
	.command('add', 'Add a new Note', {
			title:  titleOptions,
			body: bodyOptions
	})
	.command('list', 'list all notes')
	.command('read', 'Read a note',{
		title:titleOptions,
		body: bodyOptions
	})
	.help()
	.argv;
var command = argv._[0];
console.log('command',command);
console.log('yargs',argv);


if(command == 'add')
{
	var note = notes.add(argv.title, argv.body);
	if(note)
		console.log("note created", note.title, note.body);
	else
		console.log("result", "note not created");
}
else if(command == 'remove')
{
	var removed = notes.remove(argv.title, argv.body);
	if(removed)
		console.log('Note removed successfully');
	else
		console.log('Note not removed');
}
else if(command == 'read')
{
	var readnote = notes.read(argv.title);
	if(readnote)
	{
		console.log('note found');
		console.log(`title: ${readnote.title}`);
		console.log(`body: ${readnote.body}`);
	}
	else
		console.log('note not found');
	
}
else if(command == 'list')
{
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) =>  {
		console.log(`title: ${note.title}`);
		console.log(`body: ${note.body}`);
	});
}
else
{
	console.log('command not recognized');
}