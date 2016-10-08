'use strict';

/**
 * module dependencies
 */
var callApi = require( '../middleware/api/call-api' );
var createProjectBatchJob = require( '../middleware/batch-jobs/create-project-batch-job' );

/**
 * @param {Function} router
 * @param {Function} router.get
 * @param {Function} router.post
 */
module.exports = function addAjaxRouting( router ) {

  router.get( '/ajax/get-batch-job-rows', require( '../controllers/ajax/get-batch-job-rows/get' ) );
  router.get( '/ajax/get-map', callApi );
  router.get( '/ajax/get-mapping', callApi );
  router.get( '/ajax/get-pin', callApi );
  router.post( '/ajax/create-batch-job', createProjectBatchJob );
};
