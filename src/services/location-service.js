import { prisma } from '../config/prisma.js';

export async function listStates() {
  return prisma.state.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function listDistrictsByState(stateId) {
  return prisma.district.findMany({
    where: { stateId },
    orderBy: { name: 'asc' }
  });
}

export async function listSubDistrictsByDistrict(districtId) {
  return prisma.subDistrict.findMany({
    where: { districtId },
    orderBy: { name: 'asc' }
  });
}

export async function listVillagesBySubDistrict(subDistrictId, limit = 50, page = 1) {
  const skip = (page - 1) * limit;
  const [total, rows] = await Promise.all([
    prisma.village.count({ where: { subDistrictId } }),
    prisma.village.findMany({
      where: { subDistrictId },
      take: limit,
      skip,
      orderBy: { name: 'asc' }
    })
  ]);

  return { total, rows, page, limit };
}

export async function searchVillages({ q, state, district, subDistrict, limit = 20 }) {
  const and = [{ name: { contains: q } }];

  if (subDistrict) {
    and.push({ subDistrict: { name: { contains: subDistrict } } });
  }

  if (district) {
    and.push({ subDistrict: { district: { name: { contains: district } } } });
  }

  if (state) {
    and.push({
      subDistrict: {
        district: {
          state: {
            name: { contains: state }
          }
        }
      }
    });
  }

  return prisma.village.findMany({
    where: { AND: and },
    take: limit,
    orderBy: { name: 'asc' },
    include: {
      subDistrict: {
        include: {
          district: {
            include: {
              state: {
                include: {
                  country: true
                }
              }
            }
          }
        }
      }
    }
  });
}

export function mapVillageDropdown(village) {
  return {
    value: `village_id_${village.code}`,
    label: village.name,
    fullAddress: [
      village.name,
      village.subDistrict.name,
      village.subDistrict.district.name,
      village.subDistrict.district.state.name,
      village.subDistrict.district.state.country.name
    ].join(', '),
    hierarchy: {
      village: village.name,
      subDistrict: village.subDistrict.name,
      district: village.subDistrict.district.name,
      state: village.subDistrict.district.state.name,
      country: village.subDistrict.district.state.country.name
    }
  };
}
