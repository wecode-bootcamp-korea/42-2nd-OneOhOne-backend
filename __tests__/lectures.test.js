const request = require("supertest");
const { appDataSource } = require("../models/index");
const { createApp } = require("../app");

describe("getlectures", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();

    await appDataSource.query(`set FOREIGN_KEY_CHECKS=0`);
    await appDataSource.query(`TRUNCATE TABLE categories`);
    await appDataSource.query(`TRUNCATE TABLE creators`);
    await appDataSource.query(`TRUNCATE TABLE lecture_status`);
    await appDataSource.query(`TRUNCATE TABLE lectures`);
    await appDataSource.query(`set FOREIGN_KEY_CHECKS=1`);

    await appDataSource.query(
      `INSERT INTO
        categories (id, name)
      VALUES
        ("1", "cook"),
        ("2", "exercise"),
        ("3", "programming")`
    );

    await appDataSource.query(
      `INSERT INTO
        creators (id, name, image_url, description)
      VALUES
        ("1", "크리에이터 1","test image 1", "test description 1"),
        ("2", "크리에이터 2","test image 2", "test description 2"),
        ("3", "크리에이터 3","test image 3", "test description 3")`
    );

    await appDataSource.query(
      `INSERT INTO
          lecture_status (id, status)
      VALUES
        ("1", "수강가능"),
        ("2", "오픈예정")`
    );

    await appDataSource.query(
      `INSERT INTO
        lectures (id, name, price, description, main_image_url,creator_id , category_id, status_id, create_at)
      VALUES
        ("1", "강의 1", 15000, "description test 1", "image 1", 1, 1, 1, "2023-02-28 17:30:35"),
        ("2", "강의 2", 20000, "description test 2", "image 2", 2, 2, 2, "2023-02-28 17:31:20"),
        ("3", "강의 3", 10000, "description test 3", "image 3", 3, 3, 1, "2023-02-28 17:31:43"),
        ("4", "강의 4", 25000, "description test 4", "image 4", 2, 3, 1, "2023-02-28 17:32:21"),
        ("5", "강의 5", 18000, "description test 5", "image 5", 3, 1, 2, "2023-02-28 17:32:46")`
    );
  });

  afterAll(async () => {
    await appDataSource.query(`set FOREIGN_KEY_CHECKS=0`);
    await appDataSource.query(`TRUNCATE TABLE categories`);
    await appDataSource.query(`TRUNCATE TABLE creators`);
    await appDataSource.query(`TRUNCATE TABLE lecture_status`);
    await appDataSource.query(`TRUNCATE TABLE lectures`);
    await appDataSource.query(`set FOREIGN_KEY_CHECKS=1`);
    await appDataSource.destroy();
  });

  test("SUCCESS : FIND_LECTURE_LIST(all list)", async () => {
    await request(app)
      .get("/lectures")
      .expect(200, {
        data: [
          {
            lectureId: 1,
            lectureName: "강의 1",
            lecturePrice: "15000.00",
            lectureDescription: "description test 1",
            lectureMainImageUrl: "image 1",
            creatorName: "크리에이터 1",
            categoryName: "cook",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:30:35.000Z",
          },
          {
            lectureId: 2,
            lectureName: "강의 2",
            lecturePrice: "20000.00",
            lectureDescription: "description test 2",
            lectureMainImageUrl: "image 2",
            creatorName: "크리에이터 2",
            categoryName: "exercise",
            lectureStatus: "오픈예정",
            lectureCreateAt: "2023-02-28T08:31:20.000Z",
          },
          {
            lectureId: 3,
            lectureName: "강의 3",
            lecturePrice: "10000.00",
            lectureDescription: "description test 3",
            lectureMainImageUrl: "image 3",
            creatorName: "크리에이터 3",
            categoryName: "programming",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:31:43.000Z",
          },
          {
            lectureId: 4,
            lectureName: "강의 4",
            lecturePrice: "25000.00",
            lectureDescription: "description test 4",
            lectureMainImageUrl: "image 4",
            creatorName: "크리에이터 2",
            categoryName: "programming",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:32:21.000Z",
          },
          {
            lectureId: 5,
            lectureName: "강의 5",
            lecturePrice: "18000.00",
            lectureDescription: "description test 5",
            lectureMainImageUrl: "image 5",
            creatorName: "크리에이터 3",
            categoryName: "cook",
            lectureStatus: "오픈예정",
            lectureCreateAt: "2023-02-28T08:32:46.000Z",
          },
        ],
      });
  });

  test("SUCCESS : FIND_LECTURE_LIST(category=cook)", async () => {
    await request(app)
      .get("/lectures?category=cook")
      .expect(200)
      .expect({
        data: [
          {
            lectureId: 1,
            lectureName: "강의 1",
            lecturePrice: "15000.00",
            lectureDescription: "description test 1",
            lectureMainImageUrl: "image 1",
            creatorName: "크리에이터 1",
            categoryName: "cook",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:30:35.000Z",
          },
          {
            lectureId: 5,
            lectureName: "강의 5",
            lecturePrice: "18000.00",
            lectureDescription: "description test 5",
            lectureMainImageUrl: "image 5",
            creatorName: "크리에이터 3",
            categoryName: "cook",
            lectureStatus: "오픈예정",
            lectureCreateAt: "2023-02-28T08:32:46.000Z",
          },
        ],
      });
  });

  test("SUCCESS : FIND_LECTURE_LIST(category=exercise)", async () => {
    await request(app)
      .get("/lectures?category=exercise")
      .expect(200, {
        data: [
          {
            lectureId: 2,
            lectureName: "강의 2",
            lecturePrice: "20000.00",
            lectureDescription: "description test 2",
            lectureMainImageUrl: "image 2",
            creatorName: "크리에이터 2",
            categoryName: "exercise",
            lectureStatus: "오픈예정",
            lectureCreateAt: "2023-02-28T08:31:20.000Z",
          },
        ],
      });
  });

  test("SUCCESS : FIND_LECTURE_LIST(category=programming)", async () => {
    await request(app)
      .get("/lectures?category=programming")
      .expect(200, {
        data: [
          {
            lectureId: 3,
            lectureName: "강의 3",
            lecturePrice: "10000.00",
            lectureDescription: "description test 3",
            lectureMainImageUrl: "image 3",
            creatorName: "크리에이터 3",
            categoryName: "programming",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:31:43.000Z",
          },
          {
            lectureId: 4,
            lectureName: "강의 4",
            lecturePrice: "25000.00",
            lectureDescription: "description test 4",
            lectureMainImageUrl: "image 4",
            creatorName: "크리에이터 2",
            categoryName: "programming",
            lectureStatus: "수강가능",
            lectureCreateAt: "2023-02-28T08:32:21.000Z",
          },
        ],
      });
  });
});
