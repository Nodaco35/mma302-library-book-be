const fs = require('fs');
const path = require('path');

const seedDir = path.resolve(__dirname, 'seed-data');

function checkBooks() {
  const content = fs.readFileSync(path.join(seedDir, 'books.json'), 'utf8').replace(/^\uFEFF/, '');
  const books = JSON.parse(content);
  books.forEach(b => {
    if (b.availableCopies > b.totalCopies) {
      console.log(`❌ Book ID ${b.id} (${b.title}): available (${b.availableCopies}) > total (${b.totalCopies})`);
    }
  });
}

try {
  checkBooks();
  console.log('Finished checking books.');
} catch (e) {
  console.error(e);
}
