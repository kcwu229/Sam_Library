package com.study.demo.service.impl;

import com.study.demo.dto.EmployeeDto;
import com.study.demo.entity.Employee;
import com.study.demo.mapper.EmployeeMapper;
import com.study.demo.repository.EmployeeRepository;
import com.study.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    // To access the database
    private EmployeeRepository employeeRepository;

    // To save the employee details in the database
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee saveEmployee = employeeRepository.save(employee);

        // To map the saved employee details to EmployeeDto
        return EmployeeMapper.mapToEmployeeDto(saveEmployee);
    }
}
