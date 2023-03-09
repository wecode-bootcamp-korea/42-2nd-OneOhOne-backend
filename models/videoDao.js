const { appDataSource } = require("./index");

const getVideo = async(videoId) => {
 try { const getVideoQuery = await appDataSource.query(
    `SELECT
      v.id AS videoId,
      v.name AS videoName,
      v.time AS videoRuntime,
      v.video_url AS videoUrl,
     v.sequence AS videoSequence,
     c.sequence AS curriculumSequence
    FROM 
      lectures l
      INNER JOIN 
      curriculums c
    ON 
      l.id = c.lecture_id
    INNER JOIN 
      videos v
    ON
      c.id = v.curriculum_id
    WHERE v.id= ?
    
    ORDER BY 
      c.sequence`,
    [videoId]

    );
    return getVideoQuery;
  }catch(err){
    const error = new Error("INVALID_GET_VIDEOS");
    error.statusCode= 401;
    throw error
  };
};

const getLectureDetails = async (lectureId) => {
  try {
    const [curriculums, lecture] = await Promise.all([
      appDataSource.query(`
        SELECT 
          c.id AS curriculumId,
          c.chapter_name AS chapterName,
          c.sequence AS curriculumsSequence,
          JSON_ARRAYAGG(JSON_OBJECT(
            'name', v.name,
            'time', v.time,
            'videoUrl', v.video_url,
            'videoId', v.id
          )) AS videos
        FROM 
          curriculums c
        INNER JOIN 
          lectures l
        ON
          c.lecture_id = l.id
        LEFT JOIN 
          videos v
        ON 
          c.id = v.curriculum_id
        WHERE l.id = ?
        GROUP BY 
          c.id
        ORDER BY 
          c.sequence
      `, [lectureId]),

      appDataSource.query(`
        SELECT
          l.id AS lectureId,
          l.name AS lectureName,
          c.sequence AS curriculumsSequence
        FROM 
          lectures l
        INNER JOIN 
          curriculums c
        ON 
          l.id = c.lecture_id
        WHERE l.id = ?
        ORDER BY 
          c.sequence`, 
          [lectureId])
    ]);

    return {
      
      lecture: {
        id: lecture[0].lectureId,
        name: lecture[0].lectureName,
         },
      curriculums
    };
  } catch (err) {
    const error = new Error("INVALID_GET_DETAIL_LIST");
    error.statusCode = 401;
    throw err;
  }
};


module.exports = { 
  getVideo,
  getLectureDetails
 };