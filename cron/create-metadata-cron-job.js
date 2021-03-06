/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );
var createMetadataJobs = require( '../app/helpers/metadata-jobs/create-metadata-jobs' );
var CronJob = require( 'cron' ).CronJob;

/**
 * @returns {undefined}
 */
function createMetadata() {
  createMetadataJobs()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        if ( !result.message ) {
          return;
        }

        console.log( new Date().toUTCString(), 'cronjob createMetadataJobs()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob createMetadataJobs()', err );
        throw err;
      }
    );
}

/**
 * @returns {undefined}
 */
function createMetadataCronJob() {
  new CronJob(
    config.cron.schedules.metadata_jobs,
    createMetadata,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob metadata() created - %schedule'
      .replace( '%schedule', config.cron.schedules.metadata_jobs )
  );
}

module.exports = createMetadataCronJob;
