import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const india = await prisma.country.upsert({
    where: { code: 'IN' },
    update: {},
    create: { code: 'IN', name: 'India' }
  });

  const maharashtra = await prisma.state.upsert({
    where: { code: '27' },
    update: { name: 'Maharashtra' },
    create: { code: '27', name: 'Maharashtra', countryId: india.id }
  });

  const nandurbar = await prisma.district.upsert({
    where: { stateId_code: { stateId: maharashtra.id, code: '497' } },
    update: { name: 'Nandurbar' },
    create: { code: '497', name: 'Nandurbar', stateId: maharashtra.id }
  });

  const akkalkuwa = await prisma.subDistrict.upsert({
    where: { districtId_code: { districtId: nandurbar.id, code: '03950' } },
    update: { name: 'Akkalkuwa' },
    create: { code: '03950', name: 'Akkalkuwa', districtId: nandurbar.id }
  });

  const villages = [
    { code: '525002', name: 'Manibeli' },
    { code: '525003', name: 'Dhankhedi' },
    { code: '525004', name: 'Chimalkhadi' },
    { code: '525005', name: 'Sinduri' }
  ];

  for (const village of villages) {
    await prisma.village.upsert({
      where: { code: village.code },
      update: { name: village.name, subDistrictId: akkalkuwa.id },
      create: { ...village, subDistrictId: akkalkuwa.id }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed.');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
