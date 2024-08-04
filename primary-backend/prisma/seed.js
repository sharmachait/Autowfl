import prismaClient from '../src/db';

async function seedData() {
  await prismaClient.availableTriggers.create({
    data: {
      id: 'webhook',
      name: 'Webhook',
      image:
        'https://media.licdn.com/dms/image/D4D12AQHtrdLcx2NuzQ/article-cover_image-shrink_720_1280/0/1709325806317?e=2147483647&v=beta&t=WicCYxv1O9YcYvzPDzfcDgPwMlGofEkq00DGZDVTEAY',
    },
  });
  await prismaClient.availableAction.createMany({
    data: [
      {
        id: 'email',
        name: 'Email',
        image:
          'https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw=',
      },
      {
        id: 'send-sol',
        name: 'Solana',
        image:
          'https://cdn.vectorstock.com/i/1000v/04/45/solana-logo-coin-icon-isolated-vector-43670445.jpg',
      },
    ],
  });
}

seedData();
