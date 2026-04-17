import { Router } from 'express';
import {
  listDistrictsByState,
  listStates,
  listSubDistrictsByDistrict,
  listVillagesBySubDistrict,
  mapVillageDropdown,
  searchVillages
} from '../services/location-service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const v1Router = Router();

v1Router.get('/states', async (req, res, next) => {
  try {
    const data = await listStates();
    const responseTime = Math.round(performance.now() - req.startTime);
    res.json(successResponse({ data, count: data.length, requestId: req.requestId, responseTime }));
  } catch (error) {
    next(error);
  }
});

v1Router.get('/states/:id/districts', async (req, res, next) => {
  try {
    const stateId = Number(req.params.id);
    const data = await listDistrictsByState(stateId);
    const responseTime = Math.round(performance.now() - req.startTime);
    res.json(successResponse({ data, count: data.length, requestId: req.requestId, responseTime }));
  } catch (error) {
    next(error);
  }
});

v1Router.get('/districts/:id/subdistricts', async (req, res, next) => {
  try {
    const districtId = Number(req.params.id);
    const data = await listSubDistrictsByDistrict(districtId);
    const responseTime = Math.round(performance.now() - req.startTime);
    res.json(successResponse({ data, count: data.length, requestId: req.requestId, responseTime }));
  } catch (error) {
    next(error);
  }
});

v1Router.get('/subdistricts/:id/villages', async (req, res, next) => {
  try {
    const subDistrictId = Number(req.params.id);
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 50);
    const villages = await listVillagesBySubDistrict(subDistrictId, limit, page);
    const responseTime = Math.round(performance.now() - req.startTime);

    res.json(
      successResponse({
        data: villages.rows,
        count: villages.total,
        requestId: req.requestId,
        responseTime
      })
    );
  } catch (error) {
    next(error);
  }
});

v1Router.get('/search', async (req, res, next) => {
  try {
    const q = (req.query.q ?? '').trim();

    if (q.length < 2) {
      const responseTime = Math.round(performance.now() - req.startTime);
      return res.status(400).json(
        errorResponse({
          code: 'INVALID_QUERY',
          message: 'Search query must have at least 2 characters.',
          requestId: req.requestId,
          responseTime
        })
      );
    }

    const data = await searchVillages({
      q,
      state: req.query.state?.trim(),
      district: req.query.district?.trim(),
      subDistrict: req.query.subDistrict?.trim(),
      limit: Number(req.query.limit ?? 20)
    });

    const responseTime = Math.round(performance.now() - req.startTime);
    return res.json(successResponse({ data, count: data.length, requestId: req.requestId, responseTime }));
  } catch (error) {
    next(error);
  }
});

v1Router.get('/autocomplete', async (req, res, next) => {
  try {
    const q = (req.query.q ?? '').trim();

    if (q.length < 2) {
      const responseTime = Math.round(performance.now() - req.startTime);
      return res.status(400).json(
        errorResponse({
          code: 'INVALID_QUERY',
          message: 'Search query must have at least 2 characters.',
          requestId: req.requestId,
          responseTime
        })
      );
    }

    const villages = await searchVillages({
      q,
      state: req.query.state?.trim(),
      district: req.query.district?.trim(),
      subDistrict: req.query.subDistrict?.trim(),
      limit: Number(req.query.limit ?? 20)
    });

    const data = villages.map(mapVillageDropdown);
    const responseTime = Math.round(performance.now() - req.startTime);

    return res.json(successResponse({ data, count: data.length, requestId: req.requestId, responseTime }));
  } catch (error) {
    next(error);
  }
});
