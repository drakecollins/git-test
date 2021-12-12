class Student {
    constructor(name, email, community) {
        this.name = name;
        this.email = email;
        this.community = community;
    }
}

class Bootcamp {
    constructor(name, level, students = []) {
        this.name = name;
        this.level = level;
        this.students = students;
    }
        addStudent(students){
            return this.students;
    } 
            registerStudent(studentToRegister){
                if(this.students.filter(st => st.email === studentToRegister.email).length){
                    students.push();
                }       
                else{
        }
    }
    }

