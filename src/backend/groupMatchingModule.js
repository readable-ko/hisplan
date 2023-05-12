export function getStudentInfo(items) {
  let students = [];

  for (let i = 0; i < items.length; ++i) {
    let preference = items[i].preference;
    let student = {
      id: items[i].studentId,
      friends: preference.friends,
      first: preference.first,
      second: preference.second,
      third: preference.third,
    };
    students.push(student);
  }

  return students;
}

export function groupMatching(students) {
  let studyGroups = [];

  for (let student of students) {
    if (student.friend !== null && student.friend.friend === student) {
      let sortedCourses = sortCoursesByWeight(student.coursePreferences);

      let studyGroup = null;
      for (let course of sortedCourses) {
        studyGroup = findStudyGroupByCourse(studyGroups, course);

        if (studyGroup !== null && hasVacancy(studyGroup)) {
          addStudentToStudyGroup(student, studyGroup);
          break;
        }
      }

      if (studyGroup === null || !hasVacancy(studyGroup)) {
        studyGroup = createStudyGroup(course);
        addStudentToStudyGroup(student, studyGroup);
      }
    }
  }

  assignRemainingStudents(students, studyGroups);

  return studyGroups;
}

export function sortCoursesByWeight(coursePreferences) {
  // Sort course preferences in descending order of weight
  return coursePreferences.sort((a, b) => b.weight - a.weight);
}

export function findStudyGroupByCourse(studyGroups, course) {
  // Find a study group with the given course
  for (let group of studyGroups) {
    if (group.course === course) {
      return group;
    }
  }

  return null;
}

export function hasVacancy(studyGroup) {
  // Check if the study group has a vacancy for another student
  return studyGroup.members.length < 4; // Max capacity: 4
}

export function addStudentToStudyGroup(student, studyGroup) {
  // Add the student to the study group
  studyGroup.members.push(student);
}

export function createStudyGroup(course) {
  // Create a new study group for the given course
  let studyGroup = { course: course, members: [] };
  studyGroups.push(studyGroup);

  return studyGroup;
}

export function assignRemainingStudents(students, studyGroups) {
  for (let student of students) {
    if (!isAssignedToStudyGroup(student, studyGroups)) {
      for (let studyGroup of studyGroups) {
        if (hasVacancy(studyGroup)) {
          addStudentToStudyGroup(student, studyGroup);
          break;
        }
      }
    }
  }
}

export function isAssignedToStudyGroup(student, studyGroups) {
  for (let studyGroup of studyGroups) {
    if (studyGroup.members.includes(student)) {
      return true;
    }
  }

  return false;
}
